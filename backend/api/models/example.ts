import {Sequelize, DataTypes, Optional, Model} from "sequelize";

export interface ThingAttributes {
    id: number;
    thing: string;
    number?: number;
}

export interface ThingCreationAttributes
    extends Optional<ThingAttributes, "id"> {}

export class Thing
    extends Model<ThingAttributes, ThingCreationAttributes>
    implements ThingAttributes {
    public id!: number;
    public thing!: string;
    public number?: number;
}

// Inject Sequelize
export default function (sequelize: Sequelize) {
    Thing.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            thing: {
                type: DataTypes.STRING,
            },
            number: {
                type: DataTypes.NUMBER,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: "things",
        },
    );
    // do associations like
    // Thing.hasMany()
    return Thing;
}

import {Sequelize, DataTypes, Optional, Model} from "sequelize";

