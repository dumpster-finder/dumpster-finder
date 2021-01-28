import express from "express";
import swagger from "./routes/swagger";
import example from "./routes/example";
import cors from "cors";

// Load environment variables
const dotenvResult = require("dotenv").config();
if (dotenvResult.error) throw dotenvResult.error;

const PORT = process.env.PORT;

const app = express();

// Express middleware
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => res.send("test"));

app.use("/spec", swagger());

app.use("/example", example());

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
