import sequelize from "../config/sequelize";
import * as Things from "./example";
import * as Thangs from "./thang";

/**
 * Sequelize Boilerplate: Simple Edition
 */

const Models = {
    Things: Things.init(sequelize),
    Thangs: Thangs.init(sequelize)
};

Thangs.associate(Models);
Things.associate(Models);

export default Models;

export type MyModels = typeof Models;
