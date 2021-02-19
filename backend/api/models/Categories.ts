import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterCategoryAttributes, DumpsterCategoryCreationAttributes } from "./DumpsterCategories";
import { TagAttributes, TagCreationAttributes } from "./Tags";
import {Photos} from "./Photos";

export interface CategoryAttributes {
    categoryID : number;
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
    Tags,
}: {
    DumpsterCategories: ModelStatic<Model<DumpsterCategoryAttributes, DumpsterCategoryCreationAttributes>>;
    Tags: ModelStatic<Model<TagAttributes, TagCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Categories.hasMany(Tags, { foreignKey: "dumpsterTypeID"});
    Categories.hasMany(DumpsterCategories, { foreignKey: "dumpsterTypeID"});
}