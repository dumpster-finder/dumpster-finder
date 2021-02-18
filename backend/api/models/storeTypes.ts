import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";

export interface StoreTypeAttributes {
    storeTypeID : number;
    name: string;
}

export interface StoreTypeCreationAttributes
    extends Optional<StoreTypeAttributes, "storeTypeID"> {}

class StoreTypes
    extends Model<StoreTypeAttributes, StoreTypeCreationAttributes>
    implements StoreTypeCreationAttributes {
    public storeTypeID!: number;
    public name!: string;
}


// Inject Sequelize
export function init(sequelize: Sequelize) {
    StoreTypes.init(
        {
            storeTypeID : {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: "Generic",
            },
        },
        {
            sequelize,
            tableName: "StoreTypes",
        },
    );
    // do associations like
    // Thing.hasMany()
    return StoreTypes;
}
export function associate({
    Dumpsters,
}: {
    Dumpsters: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    StoreTypes.hasMany(Dumpsters, { foreignKey: "storeTypeID "});
}