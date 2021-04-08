import cors from "cors";
import dumpsters from "./routes/dumpsters";
import express, { NextFunction } from "express";
import { connectToDatabase } from "./config/sequelize";
import swagger from "./routes/swagger";
import pino from "pino";
import expressPino from "express-pino-logger";
import Models from "./models";
import { ValidationError } from "express-validation";
import categories from "./routes/categories";
import storeTypes from "./routes/storeTypes";
import dumpsterTypes from "./routes/dumpsterTypes";
import comments from "./routes/comments";
import { defaultLoggerOptions } from "./config/pino";
import contents from "./routes/contents";
import contentTypes from "./routes/contentTypes";
import errorHandler from "./middleware/errorHandler";
import {readWordsFromFile} from "./utils/IdGeneration";

(async () => {
    await connectToDatabase();
})();

const app = express();

/**
 * Configured Pino logger
 * Please pass it to routes instead of importing this instance
 */
export const logger = pino(defaultLoggerOptions);

const dependencies = {
    logger,
    Models,
};

// Express middleware
app.use(express.json());
app.use(cors());
app.use(expressPino({ logger }));

app.use("/spec", swagger());

app.use("/dumpsters", dumpsters(dependencies));

app.use("/categories", categories(dependencies));
app.use("/store-types", storeTypes(dependencies));
app.use("/dumpster-types", dumpsterTypes(dependencies));

/**
 * Global error handler
 *
 * Gives TypeScript a heart attack
 */
// @ts-ignore
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "ValidationError" && err instanceof ValidationError) {
        logger.error(err.details, `Validation failed in ${req.url}`);
    } else {
        logger.error(err, `Something went wrong in ${req.url}`);
    }
    next(err);
});

export default app;
