/**
 * @hidden
 * @swagger
 * components:
 *   schemas:
 *     Thang:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Some name
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
 * @hidden
 * @swagger
 * tags:
 *   - name: Thing
 *     description: Example of an API spec
 *   - name: Hello
 *     description: ehlo
 */

import {Router} from "express";
import {validate} from "express-validation";
import {postThing} from "../validators/example";
import ThingDAO from "../daos/example";
import ThangDAO from "../daos/thang";
import DumpsterDAO from "../daos/dumpsters";
import Models from "../models";
import thang from "../daos/thang";


export default function () {
    const thingDAO = ThingDAO(Models);
    const thangDAO = ThangDAO(Models);
    const router = Router();
    const dumpsterDAO = DumpsterDAO(Models);

    /**
     * @swagger
     * /example/hello:
     *   get:
     *     summary: say hello or sth
     *     tags: [Hello]
     *     responses:
     *       "200":
     *         description: the greeting
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Hello'
     */
    router.get("/hello", (req, res) => {
        res.json({hi: "there"});
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
            console.log("Hello fro example");
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

    /**
     * @swagger
     * /example/{id}/thangs:
     *   get:
     *     summary: lists a thing's thangs
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
     *               $ref: '#/components/schemas/Thang'
     */
    router.get("/:id(\\d+)/thangs", async (req: { params: {id: number}}, res) => {
        try {
            const things = await thangDAO.getAllByThing(req.params.id);
            res.status(200).json(things);
        } catch (e) {
            console.error('Something happened!', e);
            res.status(500).send("uh?");
        }
    });

    /**
     * @swagger
     * /example/{id}/thangs:
     *   post:
     *     summary: Creates a thing
     *     tags: [Thing]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Thing ID
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Thang'
     */
    router.post("/:id(\\d+)/thangs", async (req: {params:{id:number}, body: any}, res) => {
        try {
            await thangDAO.addOne({
                thingID: req.params.id,
                ...req.body
            });
            res.status(201).send("Success");
        } catch (e) {
            console.error('Something happened!', e);
            res.status(500).send("uh?");
        }
    });


    return router;
}
