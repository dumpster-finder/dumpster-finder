import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterTypeAttributes, DumpsterTypeCreationAttributes } from "./dumpsterTypes";
import { StoreTypeAttributes, StoreTypeCreationAttributes } from "./storeTypes";

export interface DumpsterAttributes {
    dumpsterID: number;
    position: object;
    name: string;
    dateAdded: string;
    dumpsterTypeID: number;
    storeTypeID: number;
    locked: boolean;
    positiveStoreViewOnDiving?: boolean;
    emptyingSchedule?: string;
    cleanliness: number;
}

export interface DumpsterCreationAttributes
    extends Optional<DumpsterAttributes, "dumpsterID"> {}

class Dumpsters
    extends Model<DumpsterAttributes, DumpsterCreationAttributes>
    implements DumpsterAttributes {
    dumpsterID!: number;
    position!: object;
    name!: string;
    dateAdded!: string;
    dumpsterTypeID!: number;
    storeTypeID!: number;
    locked!: boolean;
    positiveStoreViewOnDiving?: boolean;
    emptyingSchedule?: string;
    cleanliness!: number;

}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Dumpsters.init(
        {
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            position: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: 0,
                allowNull: false,
            },
            dateAdded: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
            dumpsterTypeID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            storeTypeID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            locked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            positiveStoreViewOnDiving: {
                type: DataTypes.BOOLEAN,
            },
            emptyingSchedule: {
                type: DataTypes.STRING,
            },
            cleanliness: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "Dumpsters",
        },
    );
    // do associations like
    // Thing.hasMany()
    return Dumpsters;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterTypes,
    StoreTypes,
    DumpsterReports,
    Ratings,
    Comments,
    Photos,
    DumpsterCategories,
    DumpsterTags,

}: {
    DumpsterTypes: ModelStatic<Model<DumpsterTypeAttributes, DumpsterTypeCreationAttributes>>;
    StoreTypes: ModelStatic<Model<StoreTypeAttributes, StoreTypeCreationAttributes>>;
    DumpsterReports: ModelStatic<Model<any, any>>;
    Ratings: ModelStatic<Model<any, any>>;
    Comments: ModelStatic<Model<any, any>>;
    Photos: ModelStatic<Model<any, any>>;
    DumpsterCategories: ModelStatic<Model<any, any>>;
    DumpsterTags: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Dumpsters.hasMany(DumpsterReports, { foreignKey: "dumpsterID"});
    Dumpsters.hasMany(Ratings, { foreignKey: "dumpsterID"});
    Dumpsters.hasMany(Comments, { foreignKey: "dumpsterID"});
    Dumpsters.hasMany(Photos, { foreignKey: "dumpsterID"});
    Dumpsters.hasMany(DumpsterCategories, { foreignKey: "dumpsterID"});
    Dumpsters.hasMany(DumpsterTags, { foreignKey: "dumpsterID"});
}
