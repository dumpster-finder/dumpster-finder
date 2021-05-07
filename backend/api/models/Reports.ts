import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./Users";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";

export interface ReportsAttributes {
    dumpsterID: number;
    userID: number;
    reason: string;
    date: string;
}

export interface ReportsCreationAttributes
    extends Optional<
        ReportsAttributes,
         "reason" | "date"
    > {}

export class Reports extends Model<ReportsAttributes, ReportsCreationAttributes>
    implements ReportsAttributes {
    public dumpsterID!: number;
    public userID!: number;
    public reason!: string;
    public date!: string;
}

export function init(sequelize: Sequelize) {
    Reports.init(
        {
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
            userID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
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
