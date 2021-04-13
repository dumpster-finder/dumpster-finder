import cors from "cors";
import express from "express";
import multer from "multer";
import pino from "pino";
import expressPino from "express-pino-logger";
import { defaultLoggerOptions } from "./config/pino";
import errorHandler from "./middleware/errorHandler";
import swagger from "./routes/swagger";
import pictures from "./routes/pictures";

const app = express();

/**
 * Configured Pino logger
 * Please pass it to routes instead of importing this instance
 */
export const logger = pino(defaultLoggerOptions);

const dependencies = {
    logger,
};

// Express middleware
app.use(express.json());
app.use(cors());
app.use(expressPino({ logger }));

// TODO find a better way to prepend /pic to all routes...
//      (not a big thing though)

// Mount Swagger docs at /pic
app.use("/pic/spec", swagger());

app.use("/pic", pictures(dependencies));

// Finally, use the error handler!
app.use(errorHandler(logger));

export default app;
