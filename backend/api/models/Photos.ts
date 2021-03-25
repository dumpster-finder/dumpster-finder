import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterPositionAttributes, DumpsterPositionCreationAttributes } from "./DumpsterPositions";
import {PhotoReports} from "./PhotoReports";
import { UserAttributes, UserCreationAttributes } from "./Users";

export interface PhotoAttributes {
    photoID: number;
    dumpsterID: number;
    url: string;
    userID: string | null;
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
    userID!: string | null;
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
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userID: {
                type: DataTypes.STRING,
            },
            dateAdded: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
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
                              DumpsterPositions,
    PhotoReports,
    Users
}: {
    DumpsterPositions: ModelStatic<Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>>;
    Users: ModelStatic<Model<UserAttributes, UserCreationAttributes>>;
    PhotoReports: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Photos.hasMany(PhotoReports, { foreignKey: "photoID"});
}