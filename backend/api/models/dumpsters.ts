import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterTypeAttributes,
    DumpsterTypeCreationAttributes,
} from "./dumpsterTypes";
import { StoreTypeAttributes, StoreTypeCreationAttributes } from "./storeTypes";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";
import { Categories } from "./Categories";

export interface DumpsterAttributes {
    revisionID: number;
    dumpsterID: number;
    position: object;
    name: string;
    dateAdded: string;
    dateUpdated: string;
    dumpsterTypeID: number;
    storeTypeID: number;
    locked: boolean;
    positiveStoreViewOnDiving: boolean | null;
    emptyingSchedule: string | null;
    cleanliness: number;
    userID: string | null;
}

export interface DumpsterCreationAttributes
    extends Optional<
        DumpsterAttributes,
        "revisionID" | "dateAdded" | "dateUpdated"
    > {}

class Dumpsters
    extends Model<DumpsterAttributes, DumpsterCreationAttributes>
    implements DumpsterAttributes {
    revisionID!: number;
    dumpsterID!: number;
    position!: object;
    name!: string;
    dateAdded!: string;
    dateUpdated!: string;
    dumpsterTypeID!: number;
    storeTypeID!: number;
    locked!: boolean;
    positiveStoreViewOnDiving!: boolean | null;
    emptyingSchedule!: string | null;
    cleanliness!: number;
    userID!: string | null;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Dumpsters.init(
        {
            revisionID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            position: {
                type: DataTypes.GEOMETRY("POINT"),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: 0,
                allowNull: false,
            },
            dateAdded: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
            dateUpdated: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
            dumpsterTypeID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            storeTypeID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            locked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            positiveStoreViewOnDiving: {
                type: DataTypes.BOOLEAN,
            },
            emptyingSchedule: {
                type: DataTypes.STRING,
            },
            cleanliness: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
            },
            userID: {
                type: DataTypes.STRING,
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
    DumpsterCategories,
    DumpsterPositions,
}: {
    DumpsterTypes: ModelStatic<
        Model<DumpsterTypeAttributes, DumpsterTypeCreationAttributes>
    >;
    StoreTypes: ModelStatic<
        Model<StoreTypeAttributes, StoreTypeCreationAttributes>
    >;
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    DumpsterCategories: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Dumpsters.hasMany(DumpsterPositions, { foreignKey: "revisionID" });
    Dumpsters.belongsToMany(Categories, {
        // @ts-ignore
        through: DumpsterCategories,
        foreignKey: "revisionID",
    });
    Dumpsters.hasMany(DumpsterPositions, { foreignKey: "revisionID" });
}
