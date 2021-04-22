import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./Users";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";

export interface ReportsAttributes {
    dumpsterReportID: number;
    dumpsterID: number;
    userID: number;
    reason: string;
    date: string;
}

export interface ReportsCreationAttributes
    extends Optional<
        ReportsAttributes,
        "dumpsterReportID" | "reason" | "date"
    > {}

export class Reports extends Model<ReportsAttributes, ReportsCreationAttributes>
    implements ReportsAttributes {
    public dumpsterReportID!: number;
    public dumpsterID!: number;
    public userID!: number;
    public reason!: string;
    public date!: string;
}

export function init(sequelize: Sequelize) {
    Reports.init(
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
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            reason: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
        },
        { sequelize, tableName: "DumpsterReports" },
    );
    return Reports;
}

export function associate({
    DumpsterPositions,
    Users,
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    Users: ModelStatic<Model<UserAttributes, UserCreationAttributes>>;
}) {
    //The fuck imma do here?
}
