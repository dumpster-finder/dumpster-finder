import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { TagAttributes, TagCreationAttributes } from "./Tags";

export interface StandardTagAttributes {
    tagID: number;
}

export interface StandardTagCreationAttributes
    extends Optional<StandardTagAttributes, "tagID"> {}

export class StandardTags
    extends Model<StandardTagAttributes, StandardTagCreationAttributes>
    implements StandardTagAttributes {
    public tagID!: number;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    StandardTags.init(
        {
            tagID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
        },
        {
            sequelize,
            tableName: "StandardTags",
        },
    );
    return StandardTags;
}

// The type is not defined yet, so use a substitute
export function associate({
    Tags,
                          }: {
    Tags: ModelStatic<Model<TagAttributes, TagCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}