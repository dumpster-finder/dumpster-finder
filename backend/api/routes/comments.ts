/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Dumpster API
 */
import { Router } from "express";
import { validate } from "express-validation";
import { postDumpster } from "../validators/dumpsters";
import CommentDAO from "../daos/comments";
import { RouteDependencies } from "../types";

export default function({ Models }: RouteDependencies) {
    const commentDAO = CommentDAO(Models);
    const router = Router();
    /**
     * @swagger
     * /comments/{dumpsterID}:
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
     *               $ref: '#/components/schemas/comments/:dumpsterID'
     */
    router.get(
        "/:dumpsterID",
        async (req: { params: { dumpsterID: number } }, res) => {
            try {
                const dumpsters = await commentDAO.getAllForDumpster(
                    req.params.dumpsterID,
                );
                res.status(200).json(dumpsters);
            } catch (e) {
                console.error("Something went wrong!", e);
                res.status(500).send("uh?");
            }
        },
    );
    /**
     * @swagger
     * /comments:
     *   post:
     *     summary: add a new comment for a dumpster
     *     tags: [Comments]
     *     requestBody:
     *          content:
     *              application/json:
     *                 schema:
     *                      type: object
     *                      properties:
     *                          dumpsterid:
     *                              type: integer
     *                          nickname:
     *                              type: string
     *                          comment:
     *                              type: string
     *                          date:
     *                              type: string
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/comments'
     */
    router.post(
        "/",
        //validate(postDumpster),
        async (req, res) => {
            try {
                const dumpsters = await commentDAO.addOne(req.body);
                res.status(200).json(dumpsters);
            } catch (e) {
                console.error("Something went wrong!", e);
                res.status(500).send("uh?");
            }
        },
    );
    /**
     * @swagger
     * /comments/{commentID}:
     *   patch:
     *     summary: rate a comment
     *     tags: [Comments]
     *     parameters:
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
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/comments'
     */
    router.patch(
        "/:commentID",
        //validate(postDumpster),
        async (
            //    req: { params: { commentID: number }; body: { vote: number } },
            req,
            res,
        ) => {
            try {
                const dumpsters = await commentDAO.updateOne(
                    //@ts-ignore
                    req.params.commentID,
                    req.body.vote,
                );
                res.status(200).json(dumpsters);
                console.log(req.params);
            } catch (e) {
                console.error("Something went wrong!", e);
                res.status(500).send("uh?");
            }
        },
    );

    return router;
}
