import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterTypeAttributes, DumpsterTypeCreationAttributes } from "./dumpsterTypes";
import { StoreTypeAttributes, StoreTypeCreationAttributes } from "./storeTypes";

export interface dumpsterAttributes {
    dumpsterID: number;
    position: object;
    name: string;
    dateAdded: string;
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
    locked!: boolean;
    positiveStoreViewOnDiving?: boolean;
    emptyingSchedule?: string;
    cleanliness!: number;

}

// Inject Sequelize
export function init(sequelize: Sequelize) {
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
            tableName: "Dumpsters",
        },
    );
    // do associations like
    // Thing.hasMany()
    return Dumpster;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterTypes,
    StoreTypes,
}: {
    DumpsterTypes: ModelStatic<Model<any, any>>;
    StoreTypes: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}
