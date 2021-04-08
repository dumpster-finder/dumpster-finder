/**
 * @swagger
 * components:
 *     schemas:
 *         ContentType:
 *             type: object
 *             properties:
 *                 contentID:
 *                     type: integer
 *                     description: ID of this content type, should be related to its placement in the list
 *                 categoryID:
 *                     type: integer
 *                     description: ID of the associated category
 *                 name:
 *                     type: string
 *                     description: The name of the content type
 *             example:
 *                 contentID: 4
 *                 categoryID: 1
 *                 name: "Milk"
 */

import { RouteDependencies } from "../types";
import { Router } from "express";
import ContentDAO from "../daos/contents";

export default function ({ Models }: RouteDependencies) {
    const router = Router();
    const contentDAO = ContentDAO(Models);

    /**
     * @swagger
     * /content-types/:
     *   get:
     *     summary: GET all (standard) content types
     *     tags: [Contents]
     *     responses:
     *       "200":
     *         description: A list of all (standard) content types
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ContentType'
     */
    router.get("/", async (req, res, next) => {
        try {
            const contentTypes = await contentDAO.getStandardContentTypes();
            res.status(200).json(contentTypes);
        } catch (e) {
            next(e);
        }
    });

    return router;
}
