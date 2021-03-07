/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Dumpster API
 */
import { Router } from "express";
import { validate } from "express-validation";
import Models from "../models";
import { postDumpster } from "../validators/dumpsters";

export default function() {
    // const commentDAO = CommentDAO(Models);
    const router = Router();
    const commentsControl = //Add comment Control here
        /**
         * @swagger
         * /comments/:dumpsterID:
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
            "/comments/:dumpsterID",
            async (req: { params: { dumpsterID: number } }, res) => {
                try {
                    const dumpsters = await commentsControl.getAllForDumpster(
                        dumpsterID,
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
    router.post("/comments", validate(postDumpster), async (req, res) => {
        try {
            const dumpsters = await commentsControl.postOne(postDumpster);
            res.status(200).json(dumpsters);
        } catch (e) {
            console.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });
    /**
     * @swagger
     * /comments:
     *   patch:
     *     summary: rate a comment
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
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/comments'
     */
    router.patch("/comments", validate(postDumpster), async (req, res) => {
        try {
            const dumpsters = await commentsControl.changeComment(postDumpster);
            res.status(200).json(dumpsters);
        } catch (e) {
            console.error("Something went wrong!", e);
            res.status(500).send("uh?");
        }
    });

    return router;
}
