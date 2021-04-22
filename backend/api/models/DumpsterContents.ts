import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";
import {
    ContentTypeAttributes,
    ContentTypeCreationAttributes,
} from "./ContentTypes";

export interface DumpsterContentsAttributes {
    dumpsterID: number;
    contentID: number;
    amount?: number | null;
    unit?: string | null;
    quality?: number | null;
    foundDate: Date;
    expiryDate?: Date | null;
}

export interface DumpsterContentsCreationAttributes
    extends Optional<DumpsterContentsAttributes, "dumpsterID" | "foundDate"> {}

export class DumpsterContents
    extends Model<
        DumpsterContentsAttributes,
        DumpsterContentsCreationAttributes
    >
    implements DumpsterContentsAttributes {
    dumpsterID!: number;
    contentID!: number;
    amount?: number | null;
    unit?: string | null;
    quality?: number | null;
    foundDate!: Date;
    expiryDate?: Date | null;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    DumpsterContents.init(
        {
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
            },
            contentID: {
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
            tableName: "DumpsterContents",
        },
    );
    return DumpsterContents;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterPositions,
    ContentTypes,
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
    ContentTypes: ModelStatic<
        Model<ContentTypeAttributes, ContentTypeCreationAttributes>
    >;
}) {
    DumpsterContents.belongsTo(ContentTypes, {
        as: "contentType",
        foreignKey: "contentID",
    });
}
