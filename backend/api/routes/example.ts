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
 *   - name: Thing
 *     description: Example of an API spec
 *   - name: Hello
 *     description: ehlo
 */

import {Router} from "express";

export default function () {
    const router = Router();

    const data: any[] = [];

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
    router.post("/", (req, res) => {
        data.push(req.body);
        res.status(201).send("Success");
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
    router.get("/", (req, res) => {
        res.json(data);
    });

    return router;
}
