import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import {
    DumpsterPositionAttributes,
    DumpsterPositionCreationAttributes,
} from "./DumpsterPositions";

export interface CommentAttributes {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    userID: string;
    comment: string;
    rating: number;
    date: Date;
}

export interface CommentCreationAttributes
    extends Optional<CommentAttributes, "commentID" | "rating" | "date"> {}

export class Comments
    extends Model<CommentAttributes, CommentCreationAttributes>
    implements CommentAttributes {
    commentID!: number;
    dumpsterID!: number;
    nickname!: string;
    userID!: string;
    comment!: string;
    rating!: number;
    date!: Date;
}

// Inject Sequelize
export function init(sequelize: Sequelize) {
    Comments.init(
        {
            commentID: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            dumpsterID: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userID: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue: 0,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
        },
        {
            sequelize,
            tableName: "Comments",
        },
    );
    return Comments;
}

// The type is not defined yet, so use a substitute
export function associate({
    DumpsterPositions,
}: {
    DumpsterPositions: ModelStatic<
        Model<DumpsterPositionAttributes, DumpsterPositionCreationAttributes>
    >;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}
