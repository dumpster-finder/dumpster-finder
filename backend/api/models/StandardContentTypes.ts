import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    ContentTypeAttributes,
    ContentTypeCreationAttributes,
} from "./ContentTypes";

export interface StandardContentTypeAttributes {
    contentID: number;
}

export interface StandardContentTypeCreationAttributes
    extends Optional<StandardContentTypeAttributes, "contentID"> {}

export class StandardContentTypes
    extends Model<
        StandardContentTypeAttributes,
        StandardContentTypeCreationAttributes
    >
    implements StandardContentTypeAttributes {
    public contentID!: number;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    StandardContentTypes.init(
        {
            contentID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
        },
        {
            sequelize,
            tableName: "StandardContentTypes",
        },
    );
    return StandardContentTypes;
}

// The type is not defined yet, so use a substitute
export function associate({
    ContentTypes,
}: {
    ContentTypes: ModelStatic<
        Model<ContentTypeAttributes, ContentTypeCreationAttributes>
    >;
}) {
    StandardContentTypes.hasOne(ContentTypes, {
        as: "contentType",
        foreignKey: "contentID",
    });
}
