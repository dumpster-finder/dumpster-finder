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
import users from "./routes/users";
import { defaultLoggerOptions } from "./config/pino";
import contents from "./routes/contents";
import contentTypes from "./routes/contentTypes";
import errorHandler, { notFoundHandler } from "./middleware/errorHandler";
import {readWordsFromFile} from "./utils/IdGeneration";
import photos from "./routes/photos";
import visits from "./routes/visits";

(async () => {
    await connectToDatabase();
})();

const app = express();

/**
 * Configured Pino logger
 * Please pass it to routes instead of importing this instance
 */
export const logger = pino(defaultLoggerOptions);
//setup the word file
const url = "./utils/wordsEnglish.txt";
export const wordList: string[] = readWordsFromFile(url);

const dependencies = {
    logger,
    Models,
};

// Express middleware
app.use(express.json());
app.use(cors());
app.use(expressPino({ logger }));

// Trust NGINX (prevents rate limiter from going *global*)
app.enable("trust proxy");

// TODO find a better way to prepend /api to all routes...
//      (not a big thing though)

app.use("/api/dumpsters", dumpsters(dependencies));
app.use("/api/dumpsters/:dumpsterID(\\d+)/comments", comments(dependencies));
app.use("/api/dumpsters/:dumpsterID(\\d+)/contents", contents(dependencies));
app.use("/api/dumpsters/:dumpsterID(\\d+)/photos", photos(dependencies));
app.use("/api/dumpsters/:dumpsterID(\\d+)/visits", visits(dependencies));

app.use("/api/categories", categories(dependencies));
app.use("/api/content-types", contentTypes(dependencies));
app.use("/api/store-types", storeTypes(dependencies));
app.use("/api/dumpster-types", dumpsterTypes(dependencies));
app.use("/api/users", users(dependencies));

// Mount Swagger docs at /api/spec
// to avoid conflicts with other routes
app.use("/api/spec", swagger());

// Finally, use the error handler!
app.use(errorHandler(logger));
// And mount a 404 handler
app.use(notFoundHandler(logger));

export default app;
