/**
 * @swagger
 * components:
 *     schemas:
 *         Rating:
 *             type: object
 *             required:
 *                 - rating
 *             properties:
 *                 rating:
 *                     type: number
 *                     description: the rating value
 *             example:
 *                 rating: 4
 * tags:
 *   - name: Ratings
 *     description: Ratings API
 */

import { RouteDependencies } from "../types";
import {Request, Router} from "express";
import RatingDAO from "../daos/ratings";
import { standardLimiter } from "../middleware/rateLimiter";
import { JwtMiddleware } from "../middleware/tokenMiddleware";
import {logger} from "../server";
import { validate } from "express-validation";
import {
    addRatings,
} from "../validators/ratings";

export default function ({ Models }: RouteDependencies) {
    const router = Router({ mergeParams: true });
    const ratingDAO = RatingDAO(Models);

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/ratings/:
     *   post:
     *     summary: Post a rating
     *     tags: [Ratings]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *               $ref: '#/components/schemas/Rating'
     *     responses:
     *       "201":
     *         description: Rating successfully written
     *         content:
     *           application/json:
     */
    router.post("/",
        JwtMiddleware,
        validate(addRatings),
        standardLimiter,
        async (
            req: Request,
            res,
            next,
        ) => {
            try {
                logger.info(req.params.dumpsterID);
                const rating = await ratingDAO.addOne(parseInt(req.params.dumpsterID),
                    req.body.rating,
                    res.locals.session.id);
                res.status(201).json(rating);
            } catch (e) {
                next(e);
            }
        },
    );


    /**
     * @swagger
     * /dumpsters/{dumpsterID}/ratings/:
     *   put:
     *     summary: Updates a rating
     *     tags: [Ratings]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *               $ref: '#/components/schemas/Rating'
     *     responses:
     *       "201":
     *         description: Rating successfully Overwritten
     *         content:
     *           application/json:
     */
    router.put("/",
        JwtMiddleware,
        validate(addRatings),
        standardLimiter,
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                const rating = await ratingDAO.updateOne(res.locals.session.id, req.params.dumpsterID, req.body.rating);
                res.status(201).json(rating);
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
