import cors from "cors";
import example from "./routes/example";
import dumpsters from "./routes/dumpsters";
import express from "express";
import sequelize from "./config/sequelize";
import swagger from "./routes/swagger";
import pino from "pino";
import expressPino from "express-pino-logger";

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established!");
    } catch (e) {
        console.error("Could not connect to the database, retrying...", e);
        // Retry after a few seconds
        setTimeout(connectToDatabase, 3000);
    }
};

(async () => {
    await connectToDatabase();
})();

const app = express();

/**
 * Configured Pino logger
 * Please pass it to routes instead of importing this instance
 */
export const logger = pino({ level: process.env.LOG_LEVEL || "info" });

const dependencies = {
    logger
};

// Express middleware
app.use(express.json());
app.use(cors());
app.use(expressPino({ logger }));

app.use("/spec", swagger());

app.use("/example", example(dependencies));

app.use("/dumpsters", dumpsters())

export default app;
