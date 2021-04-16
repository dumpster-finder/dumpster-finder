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
import {logger} from "../server";



export default function ({ Models }: RouteDependencies) {
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
     *         description: returns a new user
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     */
        router.get("/",
            standardLimiter,
            async (req, res, next) => {
            try {
                const userName : string = await generateUserID();
                const userHash = hashUser(userName);
                const salt = generateSalt()
                const passwordHash = await hashPassword(salt, userName);
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
     *     summary: Authenticates the user
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
     *         description: User valid
     *       "404":
     *         description: user Not found
     */
    router.get(
        "/validation/:userID",
        standardLimiter,
        validate(validateUser),
        async (req, res, next) => {
            try {
                const userExists : boolean = await userDAO.getOne(
                    req.params.userID
                );
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