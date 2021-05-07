import { ValidationError } from "express-validation";
import { NextFunction, Request, Response } from "express";
import { Logger } from "pino";
import { APIError } from "../types/errors";
import { MulterError } from "multer";

/**
 * Global error handler
 *
 * Logs generic messages on unknown errors,
 * keeps specific messages on known errors.
 */
const errorHandler = (logger: Logger) => (
    // The one who wrote express-validator should've
    // made ValidationError extend Error. They didn't. :(
    err: Error | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let extras = {};
    if (err.name === "ValidationError" && err instanceof ValidationError) {
        logger.error(err.details, `Request validation failed in ${req.url}`);
        res.status(400);
        extras = { details: err.details };
    } else if (err instanceof APIError) {
        logger.error(err, err.message);
        res.status(err.statusCode);
    } else if (err instanceof MulterError && err.message === "File too large") {
        if (process.env.PIC_MAX_SIZE)
            err.message = `File too large (limit ${(
                parseInt(process.env.PIC_MAX_SIZE) / 1_000_000
            ).toFixed(0)}`;
        else err.message = `File too large`;
        logger.error(err, err.message);
        res.status(400);
    } else if (err instanceof APIError) {
        logger.error(err, err.message);
        res.status(err.statusCode);
    } else {
        logger.error(err, err.message);
        res.status(500);
    }

    // Send an object with the gathered data
    res.json({ error: err.message, statusCode: res.statusCode, ...extras });
};


export default errorHandler;
