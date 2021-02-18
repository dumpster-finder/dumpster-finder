import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterTypeAttributes, DumpsterTypeCreationAttributes } from "./dumpsterTypes";
import { StoreTypeAttributes, StoreTypeCreationAttributes } from "./storeTypes";

export interface DumpsterAttributes {
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
    extends Optional<DumpsterAttributes, "dumpsterID"> {}

class Dumpsters
    extends Model<DumpsterAttributes, DumpsterCreationAttributes>
    implements DumpsterAttributes {
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
export function init(sequelize: Sequelize) {
    Dumpsters.init(
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
                type: DataTypes.INTEGER.UNSIGNED
            },
            storeTypeID: {
                type: DataTypes.INTEGER.UNSIGNED
            },
            locked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            positiveStoreViewOnDiving: {
                type: DataTypes.BOOLEAN,
            },
            emptyingSchedule: {
                type: DataTypes.STRING,
            },
            cleanliness: {
                type: DataTypes.TINYINT.UNSIGNED,
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
    return Dumpsters;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterTypes,
    StoreTypes,
}: {
    DumpsterTypes: ModelStatic<Model<DumpsterTypeAttributes, DumpsterTypeCreationAttributes>>;
    StoreTypes: ModelStatic<Model<StoreTypeAttributes, StoreTypeCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}
