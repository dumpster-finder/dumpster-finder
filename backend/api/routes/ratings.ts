/**
 * @swagger
 * components:
 *     schemas:
 *         Rating:
 *             type: object
 *             required:
 *                 - userID
 *                 - rating
 *             properties:
 *                 userID:
 *                     type: string
 *                     description: ID of this user, has to be parsed
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
     * /dumpsters/:dumpsterID(\d+)/ratings/:
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
            const rating = await ratingDAO.addOne(req.body);
            res.status(201).json(rating);
        } catch (e) {
            next(e);
        }
    });

    return router;
    /**
     * @swagger
     * /dumpsters/:dumpsterID(\d+)/ratings/:
     *   PUT:
     *     summary: Updates a rating
     *     tags: [Ratings]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
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
    router.put("/", standardLimiter, async (req, res, next) => {
        try {
            const rating = await ratingDAO.addOne(req.body);
            res.status(201).json(rating);
        } catch (e) {
            next(e);
        }
    });

    return router;
}
