// Load environment variables
const dotenvResult = require("dotenv").config();
if (dotenvResult.error) throw dotenvResult.error;

const PORT = process.env.API_PORT || 3000;

import app from "./server";

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
