import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";

export interface RatingAttributes {
    ratingID: number;
    dumpsterID: number;
    rating: number;
    date: string;
}

export interface RatingCreationAttributes
    extends Optional<RatingAttributes, "ratingID"> {}

export class Ratings
    extends Model<RatingAttributes, RatingCreationAttributes>
    implements RatingAttributes {
    ratingID!: number;
    dumpsterID!: number;
    rating!: number;
    date!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Ratings.init(
        {
            ratingID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            rating: {
                type: DataTypes.TINYINT.UNSIGNED,
            },
            date: {
                type: DataTypes.DATE,
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
                              Dumpsters,
                          }: {
    Dumpsters: ModelStatic<Model<DumpsterAttributes, DumpsterCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}