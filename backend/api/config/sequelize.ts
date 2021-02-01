import {Sequelize} from "sequelize";

let sequelize: Sequelize;

if (process.env.NODE_ENV === "development" && false) {
    sequelize = new Sequelize("sqlite::memory");
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME || "dumpster",
        process.env.DB_USER || "user",
        process.env.DB_PASSWORD || "password",
        {
            host: process.env.DB_HOST || "localhost",
            // @ts-ignore
            port: process.env.DB_PORT || 3306,
            // @ts-ignore
            dialect: process.env.DB_DIALECT || "mariadb",
            define: {
                timestamps: false,
            },
        },
    );
}

export default sequelize;
