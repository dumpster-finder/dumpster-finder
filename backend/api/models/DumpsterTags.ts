import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";
import { TagAttributes, TagCreationAttributes } from "./Tags";

export interface DumpsterTagAttributes {
    dumpsterID: number;
    tagID: number;
    amount?: number | null;
    unit?: string | null;
    quality?: number | null;
    foundDate: Date;
    expiryDate?: Date | null;
}

export interface DumpsterTagCreationAttributes
    extends Optional<DumpsterTagAttributes, "dumpsterID" | "foundDate"> {}

export class DumpsterTags
    extends Model<DumpsterTagAttributes, DumpsterTagCreationAttributes>
    implements DumpsterTagAttributes {
    dumpsterID!: number;
    tagID!: number;
    amount?: number | null;
    unit?: string | null;
    quality?: number | null;
    foundDate!: Date;
    expiryDate?: Date | null;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    DumpsterTags.init(
        {
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
            },
            tagID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
            },
            unit: {
                type: DataTypes.STRING,
            },
            quality: {
                type: DataTypes.TINYINT.UNSIGNED,
            },
            foundDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
            expiryDate: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: "DumpsterTags",
        },
    );
    return DumpsterTags;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterPositions,
    Tags,
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    Tags: ModelStatic<Model<TagAttributes, TagCreationAttributes>>;
}) {
    // DumpsterTags.belongsTo(DumpsterPositions, { foreignKey: "dumpsterID" });
    DumpsterTags.belongsTo(Tags, { as: "tag", foreignKey: "tagID" });
}
