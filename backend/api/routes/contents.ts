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
 *         foundDate: "2021-03-20"
 *
 * tags:
 *   - name: Contents
 *     description: Things users have found in dumpsters
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import { RouteDependencies } from "../types";
import ContentDAO from "../daos/contents";
import {
    deleteContent,
    getContent,
    postContent,
    putContent,
} from "../validators/contents";
import { standardLimiter, updateLimiter } from "../middleware/rateLimiter";
import { APIError, NotFoundError, UnknownError } from "../types/errors";
import {JwtMiddleware} from "../middleware/tokenMiddleware";

export default function({ Models }: RouteDependencies) {
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
        standardLimiter,
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
     *       - in: header
     *         name: JWTToken
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
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
        updateLimiter,
        JwtMiddleware,
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
     * /dumpsters/{dumpsterID}/contents/{contentType}-{foundDate}:
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
     *       - in: path
     *         name: contentType
     *         schema:
     *           type: string
     *         required: true
     *         description: Content type
     *       - in: path
     *         name: foundDate
     *         schema:
     *           type: string
     *           format: date
     *         required: true
     *         description: Found date
     *       - in: header
     *         name: JWTToken
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
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
        "/:contentType-:foundDate",
        updateLimiter,
        JwtMiddleware,
        validate(putContent),
        async (
            req: Request & {
                params: {
                    dumpsterID: number;
                    contentType: string;
                    foundDate: Date;
                };
            },
            res,
            next,
        ) => {
            try {
                if (
                    req.params.contentType !== req.body.name ||
                    new Date(req.params.foundDate).getTime() !==
                        new Date(req.body.foundDate).getTime()
                ) {
                    throw new UnknownError(
                        "Request parameters and body do not have the same values, aborting",
                    );
                }
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

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/contents/{contentType}-{foundDate}:
     *   delete:
     *     summary: Delete a content entry
     *     tags: [Contents]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *       - in: path
     *         name: contentType
     *         schema:
     *           type: string
     *         required: true
     *         description: Content type
     *       - in: path
     *         name: foundDate
     *         schema:
     *           type: string
     *           format: date
     *         required: true
     *         description: Found date
     *       - in: header
     *         name: JWTToken
     *         schema:
     *           type: string
     *         format: uuid
     *         required: true
     *         description: JWT for authentication
     *     responses:
     *       "204":
     *         description: Successful removal
     */
    router.delete(
        "/:contentType-:foundDate",
        updateLimiter,
        JwtMiddleware,
        validate(deleteContent),
        async (
            req: Request & {
                params: {
                    dumpsterID: number;
                    contentType: string;
                    foundDate: Date;
                };
            },
            res,
            next,
        ) => {
            try {
                const result = await contentDAO.removeOne(
                    req.params.dumpsterID,
                    {
                        name: req.params.contentType,
                        foundDate: req.params.foundDate,
                    },
                );
                if (result > 1)
                    throw new APIError(
                        "More than one content entry deleted",
                        500,
                    );
                if (result < 1)
                    throw new NotFoundError("No such content entry exists");
                res.status(204).send();
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
