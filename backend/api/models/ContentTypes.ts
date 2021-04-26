import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { CategoryAttributes, CategoryCreationAttributes } from "./Categories";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";
import {
    StandardContentTypeAttributes,
    StandardContentTypeCreationAttributes,
} from "./StandardContentTypes";
import {
    DumpsterContentsAttributes,
    DumpsterContentsCreationAttributes,
} from "./DumpsterContents";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";

export interface ContentTypeAttributes {
    contentID: number;
    categoryID: number;
    name: string;
}

export interface ContentTypeCreationAttributes
    extends Optional<ContentTypeAttributes, "contentID"> {}

export class ContentTypes
    extends Model<ContentTypeAttributes, ContentTypeCreationAttributes>
    implements ContentTypeAttributes {
    contentID!: number;
    categoryID!: number;
    name!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    ContentTypes.init(
        {
            contentID: {
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
            },
        },
        {
            sequelize,
            tableName: "ContentTypes",
        },
    );
    return ContentTypes;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterPositions,
    DumpsterContents,
    StandardContentTypes,
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    DumpsterContents: ModelStatic<
        Model<DumpsterContentsAttributes, DumpsterContentsCreationAttributes>
    >;
    StandardContentTypes: ModelStatic<
        Model<
            StandardContentTypeAttributes,
            StandardContentTypeCreationAttributes
        >
    >;
}) {
    ContentTypes.hasMany(DumpsterContents, {
        as: "contentTypess",
        foreignKey: "contentID",
    });
    ContentTypes.belongsToMany(DumpsterPositions, {
        through: DumpsterContents,
        foreignKey: "contentID",
    });
    ContentTypes.hasMany(StandardContentTypes, { foreignKey: "contentID" });
}
