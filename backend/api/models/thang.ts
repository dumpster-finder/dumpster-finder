import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { ThingAttributes, ThingCreationAttributes } from "./example";

class Thang extends Model {
    public id!: number;
    public name!: string;
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
