import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterPositionAttributes, DumpsterPositionCreationAttributes } from "./DumpsterPositions";
import { UserAttributes, UserCreationAttributes } from "./Users";

export interface DumpsterReportAttributes {
    dumpsterID: number;
    userID: number;
    reason: string;
    date: string;
}

export interface DumpsterReportCreationAttributes
    extends DumpsterReportAttributes {}

export class DumpsterReports
    extends Model<DumpsterReportAttributes, DumpsterReportCreationAttributes>
    implements DumpsterReportAttributes {
    dumpsterID!: number;
    userID!: number;
    reason!: string;
    date!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    DumpsterReports.init(
        {
            dumpsterID: {
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
            },
        },
        {
            sequelize,
            tableName: "DumpsterReports",
        },
    );
    return DumpsterReports;
}

// The type is not defined yet, so use a substitute
export function associate({
                              DumpsterPositions,
    Users
                          }: {
    DumpsterPositions: ModelStatic<Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>>;
    Users: ModelStatic<Model<UserAttributes, UserCreationAttributes>>;

}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}