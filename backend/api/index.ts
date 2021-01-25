import express from "express";

// Load environment variables
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

// Express middleware
app.use(express.json());

app.get("/", (req, res) => res.send("test"));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
