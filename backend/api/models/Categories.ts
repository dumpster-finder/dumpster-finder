import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterCategoryAttributes,
    DumpsterCategoryCreationAttributes,
} from "./DumpsterCategories";
import {
    ContentTypeAttributes,
    ContentTypeCreationAttributes,
} from "./ContentTypes";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";

export interface CategoryAttributes {
    categoryID: number;
    name: string;
}

export interface CategoryCreationAttributes
    extends Optional<CategoryAttributes, "categoryID"> {}

export class Categories
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes {
    public categoryID!: number;
    public name!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Categories.init(
        {
            categoryID: {
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
            tableName: "Categories",
        },
    );
    return Categories;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterCategories,
    Dumpsters,
    ContentTypes,
}: {
    DumpsterCategories: ModelStatic<
        Model<DumpsterCategoryAttributes, DumpsterCategoryCreationAttributes>
    >;
    Dumpsters: ModelStatic<
        Model<DumpsterAttributes, DumpsterCreationAttributes>
    >;
    ContentTypes: ModelStatic<
        Model<ContentTypeAttributes, ContentTypeCreationAttributes>
    >;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    // Categories.hasMany(Tags, { foreignKey: "dumpsterTypeID" });
    Categories.hasMany(DumpsterCategories, {
        as: "dumpsterCategories",
        foreignKey: "categoryID",
    });
    Categories.belongsToMany(Dumpsters, {
        // @ts-ignore TODO this is just dumb. typeof Model should be f-ing valid. god.
        through: DumpsterCategories,
        foreignKey: "categoryID",
    });
}
