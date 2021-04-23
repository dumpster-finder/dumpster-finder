import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterPositionAttributes, DumpsterPositionCreationAttributes } from "./DumpsterPositions";

export interface RatingAttributes {
    userID: string;
    dumpsterID: number;
    rating: number;
    date: string;
}

export interface RatingCreationAttributes
    extends Optional<RatingAttributes, "date"> {}

export class Ratings
    extends Model<RatingAttributes, RatingCreationAttributes>
    implements RatingAttributes {
    userID!: string;
    dumpsterID!: number;
    rating!: number;
    date!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Ratings.init(
        {
            userID: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
            rating: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            }
        },
        {
            sequelize,
            tableName: "Ratings",
        },
    );
    return Ratings;
}

// The type is not defined yet, so use a substitute
export function associate({
                              DumpsterPositions,
                          }: {
    DumpsterPositions: ModelStatic<Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}