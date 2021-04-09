/**
 * @swagger
 * components:
 *   schemas:
 *     PostComment:
 *       type: object
 *       required:
 *         - dumpsterID
 *         - nickname
 *         - comment
 *         - date
 *       properties:
 *         dumpsterID:
 *           type: integer
 *         nickname:
 *           type: string
 *         comment:
 *           type: string
 *       example:
 *         dumpsterID: 1
 *         nickname: "internet troll"
 *         comment: "roflmao imma be helpful now hahaha"
 *     Comment:
 *       allOf:
 *         - type: object
 *           required:
 *             - commentID
 *           properties:
 *             commentID:
 *               type: integer
 *         - $ref: '#/components/schemas/PostComment'
 *         - type: object
 *           required:
 *             - rating
 *           properties:
 *             rating:
 *               type: integer
 *             date:
 *               oneOf:
 *                 - type: string
 *                   format: date
 *                 - type: string
 *                   format: date-time
 *       example:
 *         commentID: 22
 *         dumpsterID: 1
 *         nickname: "internet troll"
 *         comment: "roflmao imma be helpful now hahaha"
 *         rating: -121
 *         date: "2020-02-02"
 * tags:
 *   - name: Comments
 *     description: Comments API
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import CommentDAO from "../daos/comments";
import { RouteDependencies } from "../types";
import {
    postComment,
    getComments,
    updateComment,
} from "../validators/comments";
import { standardLimiter } from "../middleware/rateLimiter";

export default function ({ Models }: RouteDependencies) {
    const commentDAO = CommentDAO(Models);
    const router = Router({ mergeParams: true });

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/comments:
     *   get:
     *     summary: GET comments for dumpster
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Comment'
     */
    router.get(
        "/",
        standardLimiter,
        validate(getComments),
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                const dumpsters = await commentDAO.getAllForDumpster(
                    req.params.dumpsterID,
                );
                res.status(200).json(dumpsters);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/comments:
     *   post:
     *     summary: add a new comment for a dumpster
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     requestBody:
     *          content:
     *              application/json:
     *                 schema:
     *                   $ref: '#components/schemas/PostComment'
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Comment'
     */
    router.post(
        "/",
        standardLimiter,
        validate(postComment),
        async (req, res, next) => {
            try {
                const result = await commentDAO.addOne(req.body);
                res.status(201).json(result);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/comments/{commentID}:
     *   patch:
     *     summary: rate a comment
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *       - in: path
     *         name: commentID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Comment ID
     *     requestBody:
     *          content:
     *              application/json:
     *                 schema:
     *                      type: object
     *                      properties:
     *                          vote:
     *                              type: integer
     *                      example:
     *                          vote: 1
     *     responses:
     *       "200":
     *         description: The updated comment
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Comment'
     */
    router.patch(
        "/:commentID",
        validate(updateComment),
        async (req: Request & { params: { commentID: number } }, res, next) => {
            try {
                const result = await commentDAO.changeVote(
                    req.params.commentID,
                    req.body.vote,
                );
                res.status(200).json(result);
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
