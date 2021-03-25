import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";
import { StoreTypeAttributes, StoreTypeCreationAttributes } from "./storeTypes";

export interface DumpsterPositionAttributes {
    dumpsterID: number;
    position: object;
    revisionID: number | null;
}

export interface DumpsterPositionCreationAttributes
    extends Optional<DumpsterPositionAttributes, "dumpsterID"> {}

class DumpsterPositions
    extends Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    implements DumpsterPositionAttributes {
    dumpsterID!: number;
    position!: object;
    revisionID!: number | null;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    DumpsterPositions.init(
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
            revisionID: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
        },
        {
            sequelize,
            tableName: "DumpsterPositions",
        },
    );
    // do associations like
    // Thing.hasMany()
    return DumpsterPositions;
}

// The type is not defined yet, so use a substitute
export function associate({
    Dumpsters,
                              DumpsterReports,
                              Ratings,
                              Comments,
                              Photos,
                              DumpsterTags,
    DumpsterCategories,

                          }: {
    Dumpsters: ModelStatic<Model<DumpsterAttributes, DumpsterCreationAttributes>>;
    DumpsterReports: ModelStatic<Model<any, any>>;
    Ratings: ModelStatic<Model<any, any>>;
    Comments: ModelStatic<Model<any, any>>;
    Photos: ModelStatic<Model<any, any>>;
    DumpsterTags: ModelStatic<Model<any, any>>;
    DumpsterCategories: ModelStatic<Model<any, any>>;

}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    DumpsterPositions.hasMany(Dumpsters, { foreignKey: "dumpsterID"});
    DumpsterPositions.hasMany(DumpsterReports, { foreignKey: "dumpsterID"});
    DumpsterPositions.hasMany(Ratings, { foreignKey: "dumpsterID"});
    DumpsterPositions.hasMany(Comments, { foreignKey: "dumpsterID"});
    DumpsterPositions.hasMany(Photos, { foreignKey: "dumpsterID"});
    DumpsterPositions.hasMany(DumpsterTags, { foreignKey: "dumpsterID"});
    DumpsterPositions.hasMany(DumpsterCategories, { foreignKey: "dumpsterID"});
}
