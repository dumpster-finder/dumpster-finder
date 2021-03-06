/**
 * @swagger
 * components:
 *     schemas:
 *         Category:
 *             type: object
 *             properties:
 *                 categoryID:
 *                     type: integer
 *                     description: ID of this category, should be related to its placement in the list
 *                 name:
 *                     type: string
 *                     description: The category's name
 *             example:
 *                 categoryID: 42
 *                 name: "Planets"
 * tags:
 *   - name: Categories
 *     description: What users might find in a dumpster
 */

import { RouteDependencies } from "../types";
import { Router } from "express";
import CategoryDAO from "../daos/categories";
import { standardLimiter } from "../middleware/rateLimiter";

export default function({ Models }: RouteDependencies) {
    const router = Router();
    const categoryDAO = CategoryDAO(Models);

    /**
     * @swagger
     * /categories/:
     *   get:
     *     summary: GET all categories
     *     tags: [Categories]
     *     responses:
     *       "200":
     *         description: A list of all categories
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     */
    router.get("/", standardLimiter, async (req, res, next) => {
        try {
            const categories = await categoryDAO.getAll();
            res.status(200).json(categories);
        } catch (e) {
            next(e);
        }
    });

    return router;
}
