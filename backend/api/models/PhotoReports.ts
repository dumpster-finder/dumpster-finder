import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { PhotoAttributes, PhotoCreationAttributes } from "./Photos";
import { UserAttributes, UserCreationAttributes } from "./Users";

export interface PhotoReportAttributes {
    photoReportID: number;
    photoID: number;
    userID: string | null;
    reason: string;
    date: string;
}

export interface PhotoReportCreationAttributes
    extends Optional<PhotoReportAttributes, "photoReportID"> {}

export class PhotoReports
    extends Model<PhotoReportAttributes, PhotoReportCreationAttributes>
    implements PhotoReportAttributes {
    public photoReportID!: number;
    public photoID!: number;
    public userID!: string | null;
    public reason!: string;
    public date!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    PhotoReports.init(
        {
            photoReportID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            photoID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            userID: {
                type: DataTypes.STRING,
            },
            reason: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            }
        },
        {
            sequelize,
            tableName: "PhotoReports",
        },
    );
    return PhotoReports;
}

// The type is not defined yet, so use a substitute
export function associate({
                              Photos,
    Users
                          }: {
    Photos: ModelStatic<Model<PhotoAttributes, PhotoCreationAttributes>>;
    Users: ModelStatic<Model<UserAttributes, UserCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}