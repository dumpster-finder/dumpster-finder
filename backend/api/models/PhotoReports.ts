import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { PhotoAttributes, PhotoCreationAttributes } from "./Photos";
import { UserAttributes, UserCreationAttributes } from "./Users";

export interface PhotoReportAttributes {
    photoID: number;
    userID: number;
    reason: string;
    date: string;
}

export interface PhotoReportCreationAttributes
    extends PhotoReportAttributes {}

export class PhotoReports
    extends Model<PhotoReportAttributes, PhotoReportCreationAttributes>
    implements PhotoReportAttributes {
    public photoID!: number;
    public userID!: number;
    public reason!: string;
    public date!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    PhotoReports.init(
        {

            photoID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
            userID: {
                type: DataTypes.NUMBER,
                primaryKey: true,
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