import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { ThingAttributes, ThingCreationAttributes } from "./example";

export interface ThangAttributes {
    id: number;
    name: string;
    thingID: number;
}

export interface ThangCreationAttributes
    extends Optional<ThangAttributes, "id"> {}

export class Thang
    extends Model<ThangAttributes, ThangCreationAttributes>
    implements ThangAttributes {
    public id!: number;
    public name!: string;
    public thingID!: number;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Thang.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            thingID: {
                type: DataTypes.INTEGER.UNSIGNED,
            }
        },
        {
            sequelize,
            tableName: "thangs",
        },
    );
    return Thang;
}

// The type is not defined yet, so use a substitute
export function associate({
                              Things,
                          }: {
    Things: ModelStatic<Model<ThingAttributes, ThingCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}