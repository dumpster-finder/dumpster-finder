import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";

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
export function init(sequelize: Sequelize) {
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
    return Thing;
}

// The type is not defined yet, so use a substitute
export function associate({
    Thangs,
}: {
    Thangs: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Thing.hasMany(Thangs, { foreignKey: "thingID"});
}


