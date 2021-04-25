import { Express, Request } from "express";
import { exec as thatExec } from "child_process";
import { promisify } from "util";
import { InvalidDataError } from "../types/errors";
import { FileFilterCallback } from "multer";
import { UPLOAD_FOLDER } from "../config/env";

const exec = promisify(thatExec);

const descriptions: [string, string][] = [
    ["JPEG image data", "image/jpeg"],
    ["PNG image data", "image/png"],
];

/**
 * File filter for Multer
 *
 * @param req
 * @param file
 * @param callback
 */
export const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
) => {
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
};

/**
 * Checks that the file's given mime type matches its actual file type
 * (found by using the file command to inspect it)
 *
 * @param picture Picture to analyze
 */
export const mimetypeMatchesFile = async (picture: Express.Multer.File) => {
    for (const [desc, mime] of descriptions) {
        console.log(picture.filename);
        const output = await exec(`file ${UPLOAD_FOLDER}${picture.filename}`);
        if (output.stdout.includes(desc) && picture.mimetype === mime) {
            return true;
        }
    }
    return false;
};
