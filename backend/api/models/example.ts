import {Sequelize, DataTypes, Optional, Model} from "sequelize";

export interface ThingAttributes {
    id: number;
    thing: string;
    number?: number;
}

export interface ThingCreationAttributes
    extends Optional<ThingAttributes, "id"> {}

class Thing
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


export interface dumpsterAttributes {
    dumpsterID: number;
    position: object;
    name: string;
    dateAdded: string;
    dumpsterTypeID: number;
    storeTypeID: number;
    locked: boolean;
    positiveStoreViewOnDiving?: boolean;
    emptyingSchedule?: string;
    cleanliness: number;
}

export interface DumpsterCreationAttributes
    extends Optional<dumpsterAttributes, "dumpsterID"> {}

class Dumpster
    extends Model<dumpsterAttributes, DumpsterCreationAttributes>
    implements dumpsterAttributes {
    dumpsterID!: number;
    position!: object;
    name!: string;
    dateAdded!: string;
    dumpsterTypeID!: number;
    storeTypeID!: number;
    locked!: boolean;
    positiveStoreViewOnDiving?: boolean;
    emptyingSchedule?: string;
    cleanliness!: number;
}

// Inject Sequelize
export default function (sequelize: Sequelize) {
    Dumpster.init(
        {
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            position: {
                type: DataTypes.GEOMETRY('POINT'),
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: 0,
            },
            dateAdded: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            dumpsterTypeID: {
                type: DataTypes.INTEGER.UNSIGNED,
                references: {
                    model: ''
                }
            },
            storeTypeID: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            locked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            positiveStoreViewOnDiving: {
                type: DataTypes.DATE,
            },
            emptyingSchedule: {
                type: DataTypes.DATE,
            },
            cleanliness: {
                type: DataTypes.DATE,
                defaultValue: 5
            },
        },
        {
            sequelize,
            tableName: "things",
        },
    );
    // do associations like
    // Thing.hasMany()
    return Dumpster;
}
