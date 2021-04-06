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

// TODO find a better way to prepend /api to all routes...
//      (not a big thing though)

app.use("/api/dumpsters", dumpsters(dependencies));

app.use("/api/categories", categories(dependencies));
app.use("/api/store-types", storeTypes(dependencies));
app.use("/api/dumpster-types", dumpsterTypes(dependencies));

// Mount Swagger docs at /api
app.use("/api", swagger());

app.use(errorHandler(logger));

export default app;
