/**
 * @swagger
 * components:
 *   schemas:
 *     Thing:
 *       type: object
 *       required:
 *         - thing
 *       properties:
 *         thing:
 *           type: string
 *           description: Some thing
 *         number:
 *           type: integer
 *           description: A number
 *     Hello:
 *       type: object
 *       required:
 *         - hi
 *       properties:
 *         hi:
 *           type: string
 *           description: there?
 */

/**
 * @swagger
 * tags:
 *   - name: Dumpsters
 *     description: Dumpster API
 */
import {Router} from "express";
import {validate} from "express-validation";
import {postThing} from "../validators/example";
import ThingDAO from "../daos/example";
import models from "../models";


export default function () {
    const thingDAO = ThingDAO(models);
    const router = Router();
    const dumpsterControl = //Add dumpster Control here

        /**
         * @swagger
         * /example/dumpsters:
         *   get:
         *     summary: say hello or sth
         *     tags: [Dumpster]
         *     responses:
         *       "200":
         *         description: the greeting
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/dumpster/:dumpsterID'
         */
        router.get("/dumpsters", async (req, res) => {
            try {
                const dumpsters = await dumpsterControl.getAll();
                res.status(200).json(dumpsters);
            } catch (e) {
                console.error('Something went wrong!', e);
                res.status(500).send("uh?");
            }
        });

    /**
     * @swagger
     * /example/Dumpster:
     *   get:
     *     summary: say hello or sth
     *     tags: [Dumpster]
     *      parameters:
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
     *               $ref: '#/components/schemas/dumpster/:dumpsterID'
     */
    router.get("/dumpsters/:dumpsterID", async (req: {params: {id: number}}, res) => {
        try {
            const dumpsters = await dumpsterControl.getOne(dumpsterID);
            res.status(200).json(dumpsters);
        } catch (e) {
            console.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /example/Dumpster:
     *   get:
     *     summary: say hello or sth
     *     tags: [Dumpster]
     *      parameters:
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
     *               $ref: '#/components/schemas/dumpster/:dumpsterID'
     */
    router.post("/dumpsters/", validate(postDumpster)async (req, res) => {
        try {
            const dumpsters = await dumpsterControl.getOne(dumpsterID);
            res.status(200).json(dumpsters);
        } catch (e) {
            console.error('Something went wrong!', e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /example/:
     *   post:
     *     summary: Creates a thing
     *     tags: [Thing]
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Thing'
     */
    router.post("/", validate(postThing), async (req, res) => {
        try {
            await thingDAO.addOne(req.body);
            res.status(201).send("Success");
        } catch (e) {
            console.error('Something happened!', e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /example/{id}:
     *   get:
     *     summary: one thing
     *     tags: [Thing]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Thing ID
     *     responses:
     *       "200":
     *         description: the list of things.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Thing'
     */
    router.get("/:id", async (req: {params: {id: number}}, res) => {
        try {
            const thing = await thingDAO.getOne(req.params.id);
            res.status(200).json(thing);
        } catch (e) {
            console.error('Something happened!', e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /example/:
     *   get:
     *     summary: lists all the things
     *     tags: [Thing]
     *     responses:
     *       "200":
     *         description: the list of things.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Thing'
     */
    router.get("/", async (req, res) => {
        try {
            const things = await thingDAO.getAll();
            res.status(200).json(things);
        } catch (e) {
            console.error('Something happened!', e);
            res.status(500).send("uh?");
        }
    });

    return router;
}