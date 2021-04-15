/**
 * @swagger
 * components:
 *     schemas:
 *         Rating:
 *             type: object
 *             required:
 *                 - userID
 *                 - dumpsterID
 *                 - rating
 *             properties:
 *                 userID:
 *                     type: string
 *                     description: ID of this user, has to be parsed
 *                 dumpsterID:
 *                     type: number
 *                     description: The id of the dumpster being rated
 *                 rating:
 *                     type: number
 *                     description: the rating value
 *             example:
 *                 userID: crawl daring message team lamp develop
 *                 dumpsterID: 1
 *                 rating: 4
 * ratings:
 *   - name: Ratings
 *     description: Ratings API
 */

import { RouteDependencies } from "../types";
import { Router } from "express";
import RatingDAO from "../daos/ratings";
import { standardLimiter } from "../middleware/rateLimiter";

export default function ({ Models }: RouteDependencies) {
    const router = Router();
    const ratingDAO = RatingDAO(Models);

    /**
     * @swagger
     * /categories/:
     *   post:
     *     summary: Post a rating
     *     tags: [Ratings]
     *     requestBody;
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
    router.post("/", standardLimiter, async (req, res, next) => {
        try {
            const categories = await ratingDAO.addOne(req.body);
            res.status(201);
        } catch (e) {
            next(e);
        }
    });

    return router;
}
