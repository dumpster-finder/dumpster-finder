// Load environment variables
const dotenvResult = require("dotenv").config();
if (dotenvResult.error) throw dotenvResult.error;

const PORT = process.env.API_PORT || 3000;

import app, {logger} from "./server";

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}...`);
});
