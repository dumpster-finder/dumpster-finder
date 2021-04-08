import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { CategoryAttributes, CategoryCreationAttributes } from "./Categories";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";
import {
    StandardTagAttributes,
    StandardTagCreationAttributes,
} from "./StandardTags";
import {
    DumpsterTagAttributes,
    DumpsterTagCreationAttributes,
} from "./DumpsterTags";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";

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
            },
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
    DumpsterPositions,
    DumpsterTags,
    StandardTags,
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    DumpsterTags: ModelStatic<
        Model<DumpsterTagAttributes, DumpsterTagCreationAttributes>
    >;
    StandardTags: ModelStatic<
        Model<StandardTagAttributes, StandardTagCreationAttributes>
    >;
}) {
    Tags.hasMany(DumpsterTags, { as: "dumpsterTagss", foreignKey: "tagID" });
    Tags.belongsToMany(DumpsterPositions, {
        through: DumpsterTags,
        foreignKey: "tagID",
    });
    Tags.hasMany(StandardTags, { foreignKey: "tagID" });
}
