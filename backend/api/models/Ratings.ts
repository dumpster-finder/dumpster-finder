import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterPositionAttributes, DumpsterPositionCreationAttributes } from "./DumpsterPositions";
import { UserAttributes, UserCreationAttributes } from "./Users";


export interface RatingAttributes {
    userID: number;
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
    userID!: number;
    ratingID!: number;
    dumpsterID!: number;
    rating!: number;
    date!: string;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Ratings.init(
        {
            userID: {
                type: DataTypes.NUMBER,
                primaryKey: true,
            },
            ratingID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
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
    Users
                          }: {
    DumpsterPositions: ModelStatic<Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>>;
    Users: ModelStatic<Model<UserAttributes, UserCreationAttributes>>;

}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}