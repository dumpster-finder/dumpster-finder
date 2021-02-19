import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";
import { TagAttributes, TagCreationAttributes } from "./Tags";

export interface DumpsterTagAttributes {
    dumpsterID: number;
    tagID: number;
    amount?: number;
    unit?: string;
    quality?: number;
    foundDate: string;
    expiryDate?: string;
}

export interface DumpsterTagCreationAttributes
    extends Optional<DumpsterTagAttributes, "dumpsterID"> {}

export class DumpsterTags
    extends Model<DumpsterTagAttributes, DumpsterTagCreationAttributes>
    implements DumpsterTagAttributes {
    dumpsterID!: number;
    tagID!: number;
    amount?: number;
    unit?: string;
    quality?: number;
    foundDate!: string;
    expiryDate?: string;
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
                defaultValue: Sequelize.fn('now'),
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
    Dumpsters,
    Tags
}: {
    Dumpsters: ModelStatic<Model<DumpsterAttributes, DumpsterCreationAttributes>>;
    Tags: ModelStatic<Model<TagAttributes, TagCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}