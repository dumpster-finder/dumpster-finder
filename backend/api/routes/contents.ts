/**
 * @swagger
 * components:
 *   schemas:
 *     PostContent:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         amount:
 *           type: number
 *         unit:
 *           type: string
 *         expiryDate:
 *           type: string
 *           format: date
 *       example:
 *         name: "Milk"
 *         amount: 23
 *         unit: "liters"
 *         expiryDate: "2021-03-30"
 *     Content:
 *       allOf:
 *         - $ref: '#/components/schemas/PostContent'
 *         - type: object
 *           properties:
 *             foundDate:
 *               type: string
 *               format: date
 *       example:
 *         name: "Milk"
 *         amount: 23
 *         unit: "liters"
 *         expiryDate: "2021-03-30"
 *         foundDate: "2021-03-30"
 *
 * tags:
 *   - name: Contents
 *     description: Contents API
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import { RouteDependencies } from "../types";
import ContentDAO from "../daos/contents";

export default function ({ Models }: RouteDependencies) {
    const router = Router({ mergeParams: true });
    const contentDAO = ContentDAO(Models);

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/contents/:
     *   get:
     *     summary: GET contents for a dumpster
     *     tags: [Contents]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: An array of contents
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                   $ref: '#/components/schemas/Content'
     */
    router.get(
        "/",
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                const contents = await contentDAO.getAll(req.params.dumpsterID);
                res.status(200).json(contents);
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
