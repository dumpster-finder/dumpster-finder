/**
 * @swagger
 * components:
 *   schemas:
 *     PictureResult:
 *       type: object
 *       required:
 *         - statusCode
 *         - message
 *         - filename
 *       properties:
 *         statusCode:
 *           type: integer
 *         message:
 *           type: string
 *         filename:
 *           type: string
 *       example:
 *         statusCode: 201
 *         message: "File successfully uploaded"
 *         filename: "206aef2927ea5bb255067c2eaffeaed73.jpg"
 * tags:
 *   - name: Pictures
 *     description: Picture API
 */

import { Request, Router } from "express";
import { validate } from "express-validation";
import RouteDependencies from "../types/RouteDependencies";
import { standardLimiter, updateLimiter } from "../middleware/rateLimiter";
import { getPicture, postPicture } from "../validators/pictures";
import {
    APIError,
    InvalidDataError,
    NotFoundError,
    ServerError,
} from "../types/errors";
import multer from "multer";
import * as fs from "fs";
import { fileFilter, mimetypeMatchesFile } from "../controllers/pictures";
import { PIC_MAX_SIZE } from "../config/env";
import axios from "axios";

const UPLOAD_FOLDER = process.env.PIC_FOLDER || "uploads/";

const extensions: Record<string, string | undefined> = {
    "image/jpeg": "jpg",
    "image/png": "png",
};

const upload = multer({
    dest: UPLOAD_FOLDER,
    limits: {
        fileSize: PIC_MAX_SIZE, // size is in bytes or sth
    },
    fileFilter,
});
const axiosApi = axios.create({
    baseURL: process.env.API_URL || "http://localhost:3000/api/",
    timeout: 1000,
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
     *       "400":
     *         description: Invalid request
     *       "404":
     *         description: Picture not found
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
                if (UPLOAD_FOLDER.charAt(0) === "/") {
                    // Absolute path, works w/o issues
                    res.status(200).sendFile(filePath);
                } else {
                    res.status(200).sendFile(filePath, {
                        // relative path, try prepending project root
                        root: __dirname.replace("/routes", ""),
                    });
                }
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
     *               - userName
     *               - picture
     *             properties:
     *               userID:
     *                 type: number
     *               userName:
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
     *               $ref: '#/components/schemas/PictureResult'
     *       "400":
     *         description: Invalid request
     */
    router.post(
        "/",
        updateLimiter,
        validate(postPicture),
        upload.any(),
        async (req, res, next) => {
            try {
                if (!req.files) throw new InvalidDataError("No files uploaded");
                if (!(req.files instanceof Array))
                    throw new APIError("Something went wrong", 500);

                const picture = req.files.find(f => f.fieldname);
                if (!picture) {
                    req.files.forEach(f =>
                        fs.rmSync(`${UPLOAD_FOLDER}${f.filename}`),
                    );

                    throw new InvalidDataError("Invalid field name");
                }

                // Check that it *is* of the same type as its mimetype
                if (!(await mimetypeMatchesFile(picture))) {
                    fs.rmSync(`${UPLOAD_FOLDER}${picture.filename}`);
                    throw new InvalidDataError(
                        "Invalid or mismatched file type",
                    );
                }
                try {
                    await axiosApi.post(
                        `/users/validation/${req.body.userID}`,
                        {
                            userName: req.body.userName,
                        },
                    );
                } catch (e) {
                    logger.error(e, "Failed to validate userID");
                    throw new ServerError("Failed to validate userID");
                }

                // Rename file so it has an extension
                const filename = `${picture.filename}.${extensions[
                    picture.mimetype
                ] || "jpg"}`;
                fs.renameSync(
                    `${UPLOAD_FOLDER}${picture.filename}`,
                    `${UPLOAD_FOLDER}${filename}`,
                );

                logger.info(`Successfully stored file ${filename}`);
                // Send info back
                res.status(201).send({
                    message: "Picture successfully uploaded",
                    filename,
                });
            } catch (e) {
                next(e);
            }
        },
    );

    return router;
}
