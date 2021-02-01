import sequelize from "../config/sequelize";
import Things from "./example";

/**
 * Sequelize Boilerplate: Simple Edition
 */

const models = {
    Things: Things(sequelize),
};

export default models;

export type MyModels = typeof models;
