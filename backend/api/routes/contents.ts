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
 *         quality:
 *           type: integer
 *           min: 1
 *           max: 5
 *         expiryDate:
 *           type: string
 *           format: date
 *       example:
 *         name: "Milk"
 *         amount: 23
 *         unit: "liters"
 *         quality: 3
 *         expiryDate: "2021-03-30Z"
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
 *         quality: 3
 *         expiryDate: "2021-03-30Z"
 *         foundDate: "2021-03-20Z"
 *
 * tags:
 *   - name: Contents
 *     description: Contents API
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import { RouteDependencies } from "../types";
import ContentDAO from "../daos/contents";
import { getContent, postContent, putContent } from "../validators/contents";

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
        validate(getContent),
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

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/contents/:
     *   post:
     *     summary: Add content to a dumpster
     *     tags: [Contents]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PostContent'
     *     responses:
     *       "200":
     *         description: The resulting content entry
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Content'
     */
    router.post(
        "/",
        validate(postContent),
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                const result = await contentDAO.addOne(
                    req.params.dumpsterID,
                    req.body,
                );
                res.status(201).json(result);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/contents/:
     *   put:
     *     summary: Update a content entry
     *     tags: [Contents]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Content'
     *     responses:
     *       "200":
     *         description: The resulting content entry
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Content'
     */
    router.put(
        "/",
        validate(putContent),
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                const result = await contentDAO.updateOne(
                    req.params.dumpsterID,
                    req.body,
                );
                res.status(201).json(result);
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
