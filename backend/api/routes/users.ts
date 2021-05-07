/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Handles unique identifiers for users of the app
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import UserDAO from "../daos/users";
import { validateUser } from "../validators/users";
import { RouteDependencies } from "../types";
import { generateUserID } from "../utils/IdGeneration";
import { generateSalt, hashPassword } from "../utils/hashing";
import { encodeToken } from "../utils/token";
import { standardLimiter, updateLimiter } from "../middleware/rateLimiter";
import { logger } from "../server";

export default function({ Models }: RouteDependencies) {
    const router = Router();
    const userDAO = UserDAO(Models);

    /**
     * @swagger
     * /users/:
     *   post:
     *     summary: POST a request to generate a userID, and returns it to the user.
     *     tags: [Users]
     *     responses:
     *       "200":
     *         description: returns a new user
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     */
    router.post("/", updateLimiter, async (req, res, next) => {
        try {
            const userName: string = await generateUserID();
            const salt = generateSalt();
            const passwordHash = await hashPassword(salt, userName);
            console.log(userName, passwordHash);
            const userID = await userDAO.postOne(salt, passwordHash);
            res.status(200).json({ userName, userID });
        } catch (e) {
            logger.error(e, "that user already exists, send new request");
            next(e);
        }
    });

    /**
     * @swagger
     * /users/validation/{userID}:
     *   post:
     *     summary: Authenticates the user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userID
     *         schema:
     *           type: number
     *         required: true
     *         description: the User Id
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - userName
     *             properties:
     *               userName:
     *                 type: string
     *     responses:
     *       "200":
     *         description: User valid
     *       "404":
     *         description: User not found
     */
    router.post(
        "/validation/:userID(\\d+)",
        standardLimiter,
        validate(validateUser),
        async (
            req: Request & { params: { userID: number; userName: string } },
            res,
            next,
        ) => {
            try {
                const userExists: number = await userDAO.getOne(
                    req.body.userName,
                    req.params.userID,
                );
                if (userExists) {
                    res.header("x-access-token", encodeToken(userExists));
                    res.status(200).json({
                        statusCode: 200,
                        message: "User exists, validation complete",
                    });
                } else {
                    res.status(404).json({
                        statusCode: 404,
                        message: "user doesn't exist",
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
