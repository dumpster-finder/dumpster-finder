import express from "express";
import cors from "cors";
import swagger from "./routes/swagger";
import example from "./routes/example";
import dumpsters from "./routes/dumpsters";
import sequelize from "./config/sequelize";

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

// Express middleware
app.use(express.json());
app.use(cors());

app.use("/spec", swagger());

app.use("/example", example());

app.use("/dumpsters", dumpsters())

export default app;
