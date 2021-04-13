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
import { APIError, InvalidDataError, NotFoundError } from "../types/errors";
import multer from "multer";
import * as fs from "fs";

const UPLOAD_FOLDER = process.env.PIC_FOLDER || "/tmp/";

const extensions: Record<string, string | undefined> = {
    "image/jpeg": "jpg",
    "image/png": "png",
};

const upload = multer({
    dest: UPLOAD_FOLDER,
    limits: {
        fileSize: process.env.PIC_MAX_SIZE
            ? parseInt(process.env.PIC_MAX_SIZE)
            : 4_000_000, // size is in bytes or sth
    },
    fileFilter: (req, file, callback) => {
        if (file.fieldname !== "picture")
            return callback(
                new InvalidDataError(`Invalid field ${file.fieldname}`),
            );
        if (!["image/png", "image/jpeg"].includes(file.mimetype))
            return callback(
                new InvalidDataError(
                    "File type not allowed (PNG and JPEG are accepted)",
                ),
            );

        callback(null, true);
    },
});

export default function({ logger }: RouteDependencies) {
    const router = Router();

    /**
     * @swagger
     * /{filename}:
     *   get:
     *     summary: Download a picture
     *     tags: [Pictures]
     *     parameters:
     *       - in: path
     *         name: filename
     *         schema:
     *           type: string
     *         required: true
     *         description: Name of the picture file inside the server's storage
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
     *           image/png:
     *             schema:
     *               type: string
     *               format: binary
     *           image/jpeg:
     *             schema:
     *               type: string
     *               format: binary
     */
    router.get(
        "/:pictureID([a-zA-Z0-9]+[.](jpg|png))", // only allow alphanumeric IDs with file extension
        standardLimiter,
        validate(getPicture),
        (
            req: Request & {
                params: { pictureID: string };
                query: {};
            },
            res,
            next,
        ) => {
            const filePath = `${UPLOAD_FOLDER}${req.params.pictureID}`;
            if (fs.existsSync(filePath)) {
                res.status(200).sendFile(filePath);
            } else {
                throw new NotFoundError("Picture not found");
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
     *       "400":
     *         description: Invalid request
     */
    router.post(
        "/",
        updateLimiter,
        validate(postPicture),
        upload.any(),
        (req, res, next) => {
            if (!req.files) throw new InvalidDataError("No files uploaded");
            // Rename file so it has an extension
            if (!(req.files instanceof Array))
                throw new APIError("Something went wrong", 500);
            const picture = req.files.find(f => f.fieldname);
            if (!picture) throw new InvalidDataError("Invalid fieldname");
            const filename = `${picture.filename}.${extensions[
                picture.mimetype
            ] || "jpg"}`;
            fs.renameSync(
                `${UPLOAD_FOLDER}${picture.filename}`,
                `${UPLOAD_FOLDER}${filename}`,
            );
            // Send info back
            res.status(201).send({
                message: "Picture uploaded successfully",
                url: filename,
            });
        },
    );

    return router;
}
