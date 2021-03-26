import { ValidationError } from "express-validation";
import { NextFunction, Request, Response } from "express";
import {
    ForeignKeyConstraintError,
    UniqueConstraintError,
    ValidationError as SequelizeValidationError,
} from "sequelize";
import { Logger } from "pino";

/**
 * Global error handler
 *
 * Logs generic messages on unknown errors
 */
const errorHandler = (logger: Logger) => (
    err: Error | ValidationError, // The one who wrote express-validator should've
    // made ValidationError extend Error. They didn't. :(
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err.name === "ValidationError" && err instanceof ValidationError) {
        logger.error(err.details, `Request validation failed in ${req.url}`);
    } else if (err instanceof UniqueConstraintError) {
        logger.error(
            err,
            `Resource already exists: ${req.url} (${Object.keys(err.fields)})`,
        );
        res.status(409);
    } else if (err instanceof ForeignKeyConstraintError) {
        logger.error(
            err,
            `A reference was invalid: ${req.url} (${Object.keys(err.fields)})`,
        );
        res.status(400);
    } else if (err instanceof SequelizeValidationError) {
        logger.error(
            err.errors,
            `Sequelize validation failed: ${req.url} (${err.message})`,
        );
    } else {
        logger.error(err, `Something went wrong in ${req.url}`);
    }
    next(err);
};

export default errorHandler;
