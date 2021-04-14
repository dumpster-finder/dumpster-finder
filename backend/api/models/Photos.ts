import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";

export interface PhotoAttributes {
    photoID: number;
    dumpsterID: number;
    url: string;
    userID: string;
    dateAdded: Date;
}

export interface PhotoCreationAttributes
    extends Optional<PhotoAttributes, "photoID"> {}

export class Photos extends Model<PhotoAttributes, PhotoCreationAttributes>
    implements PhotoAttributes {
    photoID!: number;
    dumpsterID!: number;
    url!: string;
    userID!: string;
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
                type: DataTypes.STRING,
                allowNull: false,
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
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    PhotoReports: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Photos.hasMany(PhotoReports, { foreignKey: "photoID" });
    Photos.belongsTo(DumpsterPositions, { foreignKey: "dumpsterID" });
}
