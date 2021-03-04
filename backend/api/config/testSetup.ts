// Configure dotenv before anything else!
const dotenvResult = require("dotenv").config();
if (dotenvResult.error) throw dotenvResult.error;

import { exec as thatExec } from "child_process";
import { promisify } from "util";
import sequelize, { connectToDatabase } from "./sequelize";
const exec = promisify(thatExec);

global.beforeAll(async () => await connectToDatabase());

global.afterAll(async () => {
    await sequelize.close();
});

export async function setupTestData() {
    await exec("bash ./setup.sh", { cwd: "../db" });
}
