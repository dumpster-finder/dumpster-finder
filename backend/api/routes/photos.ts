/**
 * @swagger
 * components:
 *   schemas:
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
import { getPhotos } from "../validators/photos";

export default function({ Models }: RouteDependencies) {
    const router = Router();
    const photoDAO = PhotoDAO(Models);

    /**
     * @swagger
     * /dumpsters/{dumpsterID}/photos:
     *   get:
     *     summary: GET all photos of a dumpster
     *     tags: [Photos]
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

    return router;
}
