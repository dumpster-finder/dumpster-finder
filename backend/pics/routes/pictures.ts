/**
 * @swagger
 * components:
 *   schemas:
 *     PostPicture:
 *       type: object
 *       required:
 *         - idk
 *       properties:
 *         idk:
 *           type: integer
 *       example:
 *         idk: 1
 *     Picture:
 *       allOf:
 *         - type: object
 *           required:
 *             - pictureID
 *           properties:
 *             pictureID:
 *               type: integer
 *         - $ref: '#/components/schemas/PostPicture'
 *       example:
 *         pictureID: 23
 *         idk: 1
 * tags:
 *   - name: Pictures
 *     description: Picture API
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import RouteDependencies from "../types/RouteDependencies";
import { standardLimiter, updateLimiter } from "../middleware/rateLimiter";
import { getPicture, postPicture } from "../validators/pictures";
import PictureController from "../controllers/pictures";
import { InvalidDataError } from "../types/errors";
import multer from "multer";

const upload = multer({ dest: "/tmp/" });

export default function({ logger }: RouteDependencies) {
    const pictureController = PictureController();
    const router = Router();

    // const form = formidable({ multiples: true });

    /**
     * @swagger
     * /{pictureID}:
     *   get:
     *     summary: Download a picture
     *     tags: [Pictures]
     *     parameters:
     *       - in: path
     *         name: pictureID
     *         schema:
     *           type: string
     *         required: true
     *         description: Picture ID
     *       - in: query
     *         name: options
     *         schema:
     *           type: object
     *           properties:
     *             width:
     *               type: integer
     *               description: Width of returned picture, in pixels
     *           example:
     *             width: 100
     *         required: false
     *         style: form
     *         explode: true
     *         description: Options for returned pictures
     *     responses:
     *       "200":
     *         description: A picture
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Picture'
     */
    router.get(
        "/:pictureID([a-zA-Z0-9]+)", // only allow alphanumeric IDs
        standardLimiter,
        validate(getPicture),
        async (
            req: Request & {
                params: { pictureID: string };
                query: {};
            },
            res,
            next,
        ) => {
            try {
                await pictureController.find(req.params.pictureID);
                res.status(200).json({ hi: "it works" });
            } catch (e) {
                next(e);
            }
        },
    );

    /**
     * @swagger
     * /:
     *   post:
     *     summary: Upload a new picture
     *     tags: [Pictures]
     *     requestBody:
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             required:
     *               - userID
     *               - picture
     *             properties:
     *               userID:
     *                 type: string
     *               picture:
     *                 type: string
     *                 format: binary
     *           encoding:
     *             picture:
     *               contentType: image/jpeg, image/png
     *     responses:
     *       "201":
     *         description: Successful upload
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Picture'
     */
    router.post(
        "/",
        standardLimiter,
        validate(postPicture),
        upload.single("picture"),
        (req, res, next) => {
            if (!req.files) throw new InvalidDataError("No files uploaded");
            try {
                Object.keys(req.files).forEach(f => console.log(f));
                res.status(201).send({ eh: "idk", files: req.files });
            } catch (e) {
                next(e);
            }
            // Formidable, a possible alternative:
            // form.parse(req, async (err, fields, files) => {
            //     if (err) return next(err);
            //     try {
            //         console.log(fields);
            //         await pictureController.upload(null);
            //         res.status(201).json({ fields, files });
            //     } catch (e) {
            //         next(e);
            //     }
            // });
        },
    );

    return router;
}
