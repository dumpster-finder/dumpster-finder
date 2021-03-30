import { ValidationError } from "express-validation";
import { NextFunction, Request, Response } from "express";
import {
    ForeignKeyConstraintError,
    UniqueConstraintError,
    ValidationError as SequelizeValidationError,
} from "sequelize";
import { Logger } from "pino";
import { APIError } from "../types/errors";

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
    } else if (err instanceof UniqueConstraintError) {
        logger.error(
            err,
            `Resource already exists: ${req.url} (${Object.keys(err.fields)})`,
        );
        err.message = "Resource already exists";
        res.status(409);
        extras = { fields: Object.keys(err.fields) };
    } else if (err instanceof ForeignKeyConstraintError) {
        logger.error(
            err,
            `A reference was invalid: ${req.url} (${Object.keys(err.fields)})`,
        );
        err.message = "Invalid reference";
        res.status(422);
        extras = { fields: Object.keys(err.fields) };
    } else if (err instanceof SequelizeValidationError) {
        logger.error(
            err.errors,
            `Sequelize validation failed: ${req.url} (${err.message})`,
        );
        res.status(400);
        extras = { errors: err.errors };
    } else if (err instanceof APIError) {
        logger.error(err, err.message);
        res.status(err.statusCode);
    }

    // Send an object with the gathered data
    res.json({ error: err.message, statusCode: res.statusCode, ...extras });
};

export default errorHandler;
