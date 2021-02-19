import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";
import { CategoryAttributes, CategoryCreationAttributes } from "./Categories";


export interface DumpsterCategoryAttributes {
    dumpsterID: number;
    categoryID: number;
    dateAdded: string;
}

export interface DumpsterCategoryCreationAttributes
    extends Optional<DumpsterCategoryAttributes, "dumpsterID"> {}

export class DumpsterCategories
    extends Model<DumpsterCategoryAttributes, DumpsterCategoryCreationAttributes>
    implements DumpsterCategoryAttributes {
    public dumpsterID!: number;
    public categoryID!: number;
    public dateAdded!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    DumpsterCategories.init(
        {
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
            },
            categoryID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
            },
            dateAdded: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            }
        },
        {
            sequelize,
            tableName: "DumpsterCategories",
        },
    );
    return DumpsterCategories;
}

// The type is not defined yet, so use a substitute
export function associate({
    Dumpsters,
    Categories,
}: {
    Dumpsters: ModelStatic<Model<DumpsterAttributes, DumpsterCreationAttributes>>;
    Categories: ModelStatic<Model<CategoryAttributes, CategoryCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}