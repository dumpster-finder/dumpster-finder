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
 *     description: Comments regarding dumpsters
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import CommentDAO from "../daos/comments";
import { RouteDependencies } from "../types";
import {
    postComment,
    getComments,
    updateComment,
    deleteComment,
} from "../validators/comments";
import {
    standardLimiter,
    updateLimiter,
    voteLimiter,
} from "../middleware/rateLimiter";
import { APIError, NotFoundError } from "../types/errors";

export default function({ Models }: RouteDependencies) {
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
     *       - in: query
     *         name: options
     *         schema:
     *           type: object
     *           properties:
     *             showNegative:
     *               type: boolean
     *               description: Controls whether negatively voted comments (below a treshold) should be shown
     *           example:
     *             showNegative: false
     *         required: false
     *         style: form
     *         explode: true
     *         description: Filters and other options for comment fetching
     *     responses:
     *       "200":
     *         description: A list of comments
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Comment'
     */
    router.get(
        "/",
        standardLimiter,
        validate(getComments),
        async (
            req: Request & {
                params: { dumpsterID: number };
                query: { showNegative?: string };
            },
            res,
            next,
        ) => {
            try {
                console.log(req.query);
                const dumpsters = await commentDAO.getAllForDumpster(
                    req.params.dumpsterID,
                    { showNegative: req.query.showNegative === "true" },
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
        updateLimiter,
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
        voteLimiter,
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

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/comments/{commentID}:
     *   delete:
     *     summary: delete a comment
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
     *     responses:
     *       "204":
     *         description: Number of affected rows
     */
    router.delete(
        "/:commentID/:userID",
        updateLimiter,
        validate(deleteComment),
        async (
            req: Request & { params: { commentID: number; userID: string } },
            res,
            next,
        ) => {
            try {
                const result = await commentDAO.removeOne(
                    req.params.commentID,
                    req.params.userID,
                );
                if (result > 1)
                    throw new APIError("More than one comment deleted", 500);
                if (result < 1)
                    throw new NotFoundError("No such comment exists");
                res.status(204).send();
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
