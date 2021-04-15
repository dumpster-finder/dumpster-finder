/**
 * @swagger
 * components:
 *   schemas:
 *     PostPhoto:
 *       type: object
 *       required:
 *         - url
 *         - userID
 *       properties:
 *         url:
 *           type: string
 *         userID:
 *           type: string
 *       example:
 *         url: "https://example.com/photos/gry08ht0248thg08h0wgh4g42g2.jpg"
 *         userID: "four wide strides of water"
 *     Photo:
 *       type: object
 *       required:
 *         - photoID
 *         - url
 *         - dateAdded
 *       properties:
 *         photoID:
 *           type: integer
 *         url:
 *           type: string
 *         dateAdded:
 *           type: string
 *           format: date
 *       example:
 *         photoID: 13
 *         url: "https://example.com/photos/gry08ht0248thg08h0wgh4g42g2.jpg"
 *         dateAdded: "2020-01-12"
 *
 * tags:
 *   - name: Photos
 *     description: Photo API
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import PhotoDAO from "../daos/photos";
import { RouteDependencies } from "../types";
import { updateLimiter, standardLimiter } from "../middleware/rateLimiter";
import { getPhotos, postPhotos } from "../validators/photos";
import { PostPhoto } from "../types/Photo";
import { InvalidDataError } from "../types/errors";

export default function({ Models }: RouteDependencies) {
    const router = Router({ mergeParams: true });
    const photoDAO = PhotoDAO(Models);

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/photos:
     *   get:
     *     summary: GET all photos of a dumpster
     *     tags: [Photos]
     *     parameters:
     *       - in: path
     *         name: dumpsterID
     *         schema:
     *           type: integer
     *         required: true
     *         description: Dumpster ID
     *     responses:
     *       "200":
     *         description: An array of photos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                   $ref: '#/components/schemas/Photo'
     */
    router.get(
        "/",
        standardLimiter,
        validate(getPhotos),
        async (
            req: Request & { params: { dumpsterID: number } },
            res,
            next,
        ) => {
            try {
                const photos = await photoDAO.getAll(req.params.dumpsterID);
                res.status(200).json(photos);
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/photos:
     *   post:
     *     summary: Add a photo to a dumpster
     *     tags: [Photos]
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
     *             $ref: '#/components/schemas/PostPhoto'
     *     responses:
     *       "200":
     *         description: The posted photo
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Photo'
     */
    router.post(
        "/",
        updateLimiter,
        validate(postPhotos),
        async (
            req: Request & { params: { dumpsterID: number }; body: PostPhoto },
            res,
            next,
        ) => {
            try {
                if (
                    // Only accept URLs that come from *our* photo server
                    !req.body.url.match(
                        `${process.env.PHOTO_URL}/?[a-zA-Z0-9]+\\.(jpg|png)`,
                    )
                )
                    throw new InvalidDataError("Untrusted photo host");
                // TODO treat that userID …
                const result = await photoDAO.addOne(
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
