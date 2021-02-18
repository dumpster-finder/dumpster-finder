import sequelize from "../config/sequelize";
import * as Dumpsters from "./dumpsters";
import * as DumpsterTypes from "./dumpsterTypes";
import * as StoreTypes from "./storeTypes"

/**
 * Sequelize Boilerplate: Simple Edition
 */

const Models = {
    Dumpsters: Dumpsters.init(sequelize),
    DumpsterTypes: DumpsterTypes.init(sequelize),
    StoreTypes: StoreTypes.init(sequelize),
};

Dumpsters.associate(Models);
DumpsterTypes.associate(Models);
StoreTypes.associate(Models);

export default Models;

export type MyModels = typeof Models;
