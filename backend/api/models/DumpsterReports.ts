import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterPositionAttributes, DumpsterPositionCreationAttributes } from "./DumpsterPositions";
import { UserAttributes, UserCreationAttributes } from "./Users";

export interface DumpsterReportAttributes {
    dumpsterReportID: number;
    dumpsterID: number;
    userID: string | null;
    reason: string;
    date: string;
}

export interface DumpsterReportCreationAttributes
    extends Optional<DumpsterReportAttributes, "dumpsterReportID"> {}

export class DumpsterReports
    extends Model<DumpsterReportAttributes, DumpsterReportCreationAttributes>
    implements DumpsterReportAttributes {
    dumpsterReportID!: number;
    dumpsterID!: number;
    userID!: string | null;
    reason!: string;
    date!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    DumpsterReports.init(
        {
            dumpsterReportID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            dumpsterID: {
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