import cors from "cors";
import dumpsters from "./routes/dumpsters";
import express from "express";
import { connectToDatabase } from "./config/sequelize";
import swagger from "./routes/swagger";
import pino from "pino";
import expressPino from "express-pino-logger";
import Models from "./models";
import categories from "./routes/categories";
import storeTypes from "./routes/storeTypes";
import dumpsterTypes from "./routes/dumpsterTypes";
import { defaultLoggerOptions } from "./config/pino";
import contents from "./routes/contents";
import contentTypes from "./routes/contentTypes";
import errorHandler from "./middleware/errorHandler";

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
app.use("/content-types", contentTypes(dependencies));
app.use("/store-types", storeTypes(dependencies));
app.use("/dumpster-types", dumpsterTypes(dependencies));

// (TODO move up when comment API is merged)
app.use("/dumpsters/:dumpsterID(\\d+)/contents", contents(dependencies));

// Finally, use the error handler!
app.use(errorHandler(logger));

export default app;
