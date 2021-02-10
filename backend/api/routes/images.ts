/**
 * @swagger
 * tags:
 *   - name: Images
 *     description: Dumpster API
 */
import {Router} from "express";
import {validate} from "express-validation";
import {postThing} from "../validators/example";
import ThingDAO from "../daos/example";
import models from "../models";
import {postDumpster} from "../validators/dumpsters";


export default function () {
    const thingDAO = ThingDAO(models);
    const router = Router();
    const imagesControl = //Add image Control here
        /**
         * @swagger
         * /images/:dumpsterID:
         *   get:
         *     summary: GET images for dumpster
         *     tags: [Images]
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
         *               $ref: '#/components/schemas/images/:dumpsterID'
         */
        router.get("/images/:dumpsterID", async (req: {params: {dumpsterID: number}}, res) => {
            try {
                const dumpsters = await imagesControl.getAllForDumpster(dumpsterID);
                res.status(200).json(dumpsters);
            } catch (e) {
                console.error('Something went wrong!', e);
                res.status(500).send("uh?");
            }
        });
    /**
     * @swagger
     * /images:
     *   post:
     *     summary: add a new comment for a dumpster
     *     tags: [Images]
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
     *               $ref: '#/components/schemas/images'
     */
    router.post("/comments", validate(postDumpster), async (req, res) => {
        try {
            const dumpsters = await imagesControl.postOne(postDumpster);
            res.status(200).json(dumpsters);
        } catch (e) {
            console.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });

    return router;