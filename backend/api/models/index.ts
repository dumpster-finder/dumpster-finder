import sequelize from "../config/sequelize";
import * as Dumpsters from "./dumpsters";
import * as DumpsterTypes from "./dumpsterTypes";
import * as DumpsterPositions from "./DumpsterPositions";
import * as StoreTypes from "./storeTypes";
import * as Categories from "./Categories";
import * as Comments from "./Comments";
import * as DumpsterCategories from "./DumpsterCategories";
import * as DumpsterReports from "./DumpsterReports";
import * as PhotoReports from "./PhotoReports";
import * as Photos from "./Photos";
import * as Ratings from "./Ratings";
import * as StandardTags from "./StandardTags";
import * as Tags from "./Tags";
import * as DumpsterTags from "./DumpsterTags";
import * as Users from "./Users";
import * as Visits from "./Visits";

/**
 * Sequelize Boilerplate: Simple Edition
 */

const Models = {
    sequelize,
    DumpsterTypes: DumpsterTypes.init(sequelize),
    Users: Users.init(sequelize),
    DumpsterPositions: DumpsterPositions.init(sequelize),
    StoreTypes: StoreTypes.init(sequelize),
    Categories: Categories.init(sequelize),
    Dumpsters: Dumpsters.init(sequelize),
    Tags: Tags.init(sequelize),
    Comments: Comments.init(sequelize),
    DumpsterCategories: DumpsterCategories.init(sequelize),
    DumpsterReports: DumpsterReports.init(sequelize),
    PhotoReports: PhotoReports.init(sequelize),
    Photos: Photos.init(sequelize),
    Ratings: Ratings.init(sequelize),
    StandardTags: StandardTags.init(sequelize),
    DumpsterTags: DumpsterTags.init(sequelize),
    Visits: Visits.init(sequelize),
};

DumpsterTypes.associate(Models);
Users.associate(Models);
DumpsterPositions.associate(Models);
StoreTypes.associate(Models);
Dumpsters.associate(Models);
Categories.associate(Models);
Comments.associate(Models);
DumpsterCategories.associate(Models);
DumpsterReports.associate(Models);
PhotoReports.associate(Models);
Photos.associate(Models);
Ratings.associate(Models);
StandardTags.associate(Models);
Tags.associate(Models);
DumpsterTags.associate(Models);
Visits.associate(Models);

export default Models;

export type MyModels = typeof Models;
