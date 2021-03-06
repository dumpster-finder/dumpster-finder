import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";

export interface DumpsterTypeAttributes {
    dumpsterTypeID: number;
    name: string;
}

export interface DumpsterTypeCreationAttributes
    extends Optional<DumpsterTypeAttributes, "dumpsterTypeID"> {}

class DumpsterTypes
    extends Model<DumpsterTypeAttributes, DumpsterTypeCreationAttributes>
    implements DumpsterTypeAttributes {
    public dumpsterTypeID!: number;
    public name!: string;
}


// Inject Sequelize
export function init(sequelize: Sequelize) {
    DumpsterTypes.init(
        {
            dumpsterTypeID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "DumpsterTypes",
        },
    );
    return DumpsterTypes;
}
export function associate({
    Dumpsters,
}: {
    Dumpsters: ModelStatic<Model<any, any>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    DumpsterTypes.hasMany(Dumpsters, { foreignKey: "dumpsterTypeID"});
}

