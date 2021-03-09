import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";
import { CategoryAttributes, CategoryCreationAttributes } from "./Categories";

export interface DumpsterCategoryAttributes {
    dumpsterID: number;
    revisionID: number;
    categoryID: number;
    dateAdded: string;
}

export interface DumpsterCategoryCreationAttributes
    extends Optional<DumpsterCategoryAttributes, "dumpsterID" | "dateAdded"> {}

export class DumpsterCategories
    extends Model<
        DumpsterCategoryAttributes,
        DumpsterCategoryCreationAttributes
    >
    implements DumpsterCategoryAttributes {
    public dumpsterID!: number;
    public revisionID!: number;
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
            revisionID: {
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
                defaultValue: Sequelize.fn("now"),
            },
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
    Categories,
    Dumpsters,
}: {
    Dumpsters: ModelStatic<
        Model<DumpsterAttributes, DumpsterCreationAttributes>
    >;
    Categories: ModelStatic<
        Model<CategoryAttributes, CategoryCreationAttributes>
    >;
}) {
    // @ts-ignore
    DumpsterCategories.belongsTo(Categories, { foreignKey: "categoryID" });
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}
