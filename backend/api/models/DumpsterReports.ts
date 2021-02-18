import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";

export interface DumpsterReportAttributes {
    dumpsterReportID: number;
    dumpsterID: number;
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
            },
            reason: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.DATE,
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
                              Dumpsters,
                          }: {
    Dumpsters: ModelStatic<Model<DumpsterAttributes, DumpsterCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}