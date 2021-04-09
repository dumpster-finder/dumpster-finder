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
import DumpsterDAO from "../daos/dumpsters";
import CategoryDAo from "../daos/categories";
import {
    getDumpster,
    locationParams,
    postDumpster,
    putDumpster,
} from "../validators/dumpsters";
import { RouteDependencies } from "../types";
import { PositionParams } from "../types/Position";
import {generateUserID} from "../utils/IdGeneration";
import {hashUser, generateSalt, hashPassword} from "../utils/hashing";



export default function ({ logger, Models }: RouteDependencies) {
    const router = Router();
    const dumpsterDAO = DumpsterDAO(Models);
    const userDAO = CategoryDAo(Models);

    /**
     * @swagger
     * /users/:
     *   get:
     *     summary: GET a userID, and register it in server
     *     tags: [Users]
     *     parameters:
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
            async (req, res, next) => {
            try {
                const userName : string = generateUserID();
                logger.info(userName)
                const userHash = hashUser(userName);
                logger.info(userHash);
                const salt = generateSalt()
                logger.info(salt);
                const passwordHash = hashPassword(salt, userHash);
                logger.info(passwordHash);
                res.status(200);
            } catch (e) {
                logger.error(e, "Something went wrong!");
                next(e);
            }
        });

    /**
     * @swagger
     * /users/validation:
     *   get:
     *     summary: GET Dumpster by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: The requested dumpster
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Dumpster'
     *       "404":
     *         description: Not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Message'
     */
    router.get(
        "/:dumpsterID(\\d+)",
        validate(getDumpster),
        async (req, res, next) => {
            try {
                const dumpster = await dumpsterDAO.getOne(
                    parseInt(req.params.dumpsterID),
                );
                if (dumpster) {
                    res.status(200).json(dumpster);
                } else {
                    res.status(404).json({
                        statusCode: 404,
                        message: "Dumpster not found",
                    });
                }
            } catch (e) {
                logger.error(e, "Something went wrong!");
                next(e);
            }
        },
    );

    return router;
}