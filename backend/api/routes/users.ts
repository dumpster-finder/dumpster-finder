/**
 * @swagger
 * components:
 *   schemas:
 *     getValidate:
 *       type: object
 *       required:
 *         - date
 *       properties:
 *         userName:
 *           type: integer
 *       example:
 *         userName: ahahah
 *     Users:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *           description: ID hash, used to identify user
 *         userName:
 *           type: string
 *           description: simple hash, used to identify user for authentication
 *         salt:
 *           type: string
 *           description: the salt for the hash
 *       example:
 *         userID: fix
 *         userName: fix
 *         salt: fix
 * user:
 *   - name: Comments
 *     description: Comments API
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import UserDAO from "../daos/users";
import {
    validateUser
} from "../validators/users";
import { RouteDependencies } from "../types";
import {generateUserID} from "../utils/IdGeneration";
import {hashUser, generateSalt, hashPassword} from "../utils/hashing";
import {standardLimiter} from "../middleware/rateLimiter";



export default function ({ logger, Models }: RouteDependencies) {
    const router = Router();
    const userDAO = UserDAO(Models);

    /**
     * @swagger
     * /users/:
     *   get:
     *     summary: GET a userID, and register it in server
     *     tags: [Users]
     *     responses:
     *       "200":
     *         description: An array of dumpsters
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                   $ref: '#/components/schemas/Users'
     */
        router.get("/",
            standardLimiter,
            async (req, res, next) => {
            try {
                const userName : string = await generateUserID();
                logger.info(userName);
                const userHash = hashUser(userName);
                logger.info(userHash);
                const salt = generateSalt()
                logger.info(salt);
                const passwordHash = hashPassword(salt, userHash);
                logger.info(passwordHash);
                const success = await userDAO.postOne( userHash, salt, passwordHash);
                res.status(200).json(userName);
            } catch (e) {
                logger.error(e, "that user already exists, send new request");
                next(e);
            }
        });

    /**
     * @swagger
     * /users/validation/{userID}:
     *   get:
     *     summary: GET Dumpster by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userID
     *         schema:
     *           type: string
     *         required: true
     *         description: the User Id
     *     responses:
     *       "200":
     *         description: The requested dumpster
     *       "404":
     *         description: Not found
     */
    router.get(
        "/validation/:userID",
        standardLimiter,
        validate(validateUser),
        async (req, res, next) => {
            try {
                const userExists : boolean = await userDAO.checkOne(
                    req.params.userId
                );
                logger.info(userExists.toString());
                if (userExists) {
                    res.status(200).json({
                        statusCode: 200,
                        message: "User exists, validation complete"
                    });
                } else {
                    res.status(404).json({
                        statusCode: 404,
                        message: "user doesn't exist"
                })
                }
            } catch (e) {
                logger.error(e, "Something went wrong!");
                next(e);
            }
        },
    );

    return router;
}