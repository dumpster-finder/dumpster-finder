import { Sequelize } from "sequelize";
import pino from "pino";
import { defaultLoggerOptions } from "./pino";

const logger = pino(defaultLoggerOptions);

const sequelize = new Sequelize(
    process.env.DB_NAME || "dumpster",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "password",
    {
        host: process.env.DB_HOST || "localhost",
        // @ts-ignore
        port: process.env.DB_PORT || 3306,
        // @ts-ignore
        dialect: process.env.DB_DIALECT || "mariadb",
        logging: (sql, timing) =>
            logger.info(sql, timing ? `Elapsed time: ${timing} ms` : ""),
        define: {
            timestamps: false,
        },
    },
);

export const connectToDatabase = async (tries = 10) => {
    try {
        await sequelize.authenticate();
        logger.info("Database connection established!");
    } catch (e) {
        if (tries <= 0)
            throw new Error(
                "Could not connect to the database after 10 tries, aborting.",
            );
        logger.info("Could not connect to the database, retrying...", e);
        // Retry after a few seconds
        setTimeout(() => connectToDatabase(tries - 1), 3000);
    }
};

export default sequelize;
