import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { CategoryAttributes, CategoryCreationAttributes } from "./Categories";

export interface TagAttributes {
    tagID: number;
    categoryID: number;
    name: string;
}

export interface TagCreationAttributes
    extends Optional<TagAttributes, "tagID"> {}

export class Tags
    extends Model<TagAttributes, TagCreationAttributes>
    implements TagAttributes {
    tagID!: number;
    categoryID!: number;
    name!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Tags.init(
        {
            tagID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            categoryID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: "Tags",
        },
    );
    return Tags;
}

// The type is not defined yet, so use a substitute
export function associate({
    Categories,
    DumpsterTags,
    StandardTags
}: {
    DumpsterTags: ModelStatic<Model<any, any>>;
    StandardTags: ModelStatic<Model<any, any>>;
    Categories: ModelStatic<Model<CategoryAttributes, CategoryCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
    Tags.hasMany(DumpsterTags, { foreignKey: "tagID"});
    Tags.hasMany(StandardTags, { foreignKey: "tagID"});
}