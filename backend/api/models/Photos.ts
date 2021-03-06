import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";
import { UserAttributes, UserCreationAttributes } from "./Users";

export interface PhotoAttributes {
    photoID: number;
    dumpsterID: number;
    url: string;
    userID: number | null;
    dateAdded: Date;
}

export interface PhotoCreationAttributes
    extends Optional<PhotoAttributes, "photoID" | "dateAdded"> {}

export class Photos extends Model<PhotoAttributes, PhotoCreationAttributes>
    implements PhotoAttributes {
    photoID!: number;
    dumpsterID!: number;
    url!: string;
    userID!: number | null;
    dateAdded!: Date;
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
                type: DataTypes.INTEGER.UNSIGNED,
            },
            dateAdded: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
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
    Users,
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    Users: ModelStatic<Model<UserAttributes, UserCreationAttributes>>;
    PhotoReports: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Photos.hasMany(PhotoReports, { foreignKey: "photoID" });
}
