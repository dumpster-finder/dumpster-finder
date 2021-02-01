import express from "express";
import cors from "cors";
import swagger from "./routes/swagger";
import example from "./routes/example";
import sequelize from "./config/sequelize";

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established!");
    } catch (e) {
        console.error("Could not connect to the database", e);
    }
})();

const app = express();

// Express middleware
app.use(express.json());
app.use(cors());

app.use("/spec", swagger());

app.use("/example", example());

export default app;
