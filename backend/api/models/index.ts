import sequelize from "../config/sequelize";
import * as Dumpsters from "./dumpsters";
import * as DumpsterTypes from "./dumpsterTypes";
import * as StoreTypes from "./storeTypes"
import * as Things from "./example";
import * as Thangs from "./thang";

/**
 * Sequelize Boilerplate: Simple Edition
 */

const Models = {
    DumpsterTypes: DumpsterTypes.init(sequelize),
    StoreTypes: StoreTypes.init(sequelize),
    Dumpsters: Dumpsters.init(sequelize),
    Things: Things.init(sequelize),
    Thangs: Thangs.init(sequelize)
};

Dumpsters.associate(Models);
DumpsterTypes.associate(Models);
StoreTypes.associate(Models);
Thangs.associate(Models);
Things.associate(Models);

export default Models;

export type MyModels = typeof Models;
