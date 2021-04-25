import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";
import { UserAttributes, UserCreationAttributes } from "./Users";

export interface VisitsAttributes {
    dumpsterID: number;
    visitDate: string;
    userID: number;
}

export interface VisitsCreationAttributes
    extends Optional<VisitsAttributes, "visitDate"> {}

export class Visits extends Model<VisitsAttributes, VisitsCreationAttributes>
    implements VisitsAttributes {
    public dumpsterID!: number;
    public visitDate!: string;
    public userID!: number;
}

export function init(sequelize: Sequelize) {
    Visits.init(
        {
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            visitDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
                primaryKey: true,
            },
            userID: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
            },
        },
        { sequelize, tableName: "Visits" },
    );
    return Visits;
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
