import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";
import {PhotoReports} from "./PhotoReports";

export interface PhotoAttributes {
    photoID: number;
    dumpsterID: number;
    url: string;
    key_: string;
    dateAdded: string;
}

export interface PhotoCreationAttributes
    extends Optional<PhotoAttributes, "photoID"> {}

export class Photos
    extends Model<PhotoAttributes, PhotoCreationAttributes>
    implements PhotoAttributes {
    photoID!: number;
    dumpsterID!: number;
    url!: string;
    key_!: string;
    dateAdded!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Photos.init(
        {
            photoID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            url: {
                type: DataTypes.STRING,
            },
            key_: {
                type: DataTypes.STRING,
            },
            dateAdded: {
                type: DataTypes.GEOMETRY('POINT'),
            },
        },
        {
            sequelize,
            tableName: "Photos",
        },
    );
    return Photos;
}

// The type is not defined yet, so use a substitute
export function associate({
                              Dumpsters,
                          }: {
    Dumpsters: ModelStatic<Model<DumpsterAttributes, DumpsterCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Photos.hasMany(PhotoReports, { foreignKey: "photoReportID"});
}