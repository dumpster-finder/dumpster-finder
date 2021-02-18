import { Sequelize, DataTypes, Optional, Model, ModelStatic } from "sequelize";
import { DumpsterAttributes, DumpsterCreationAttributes } from "./dumpsters";

export interface CommentAttributes {
    commentID: number;
    dumpsterID: number;
    nickname: string;
    comment: string;
    rating: number;
    date: string;
}

export interface CommentCreationAttributes
    extends Optional<CommentAttributes, "commentID"> {}

export class Comments
    extends Model<CommentAttributes, CommentCreationAttributes>
    implements CommentAttributes {
    commentID!: number;
    dumpsterID!: number;
    nickname!: string;
    comment!: string;
    rating!: number;
    date!: string;
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
            },
            nickname: {
                type: DataTypes.STRING,
            },
            comment: {
                type: DataTypes.STRING,
            },
            rating: {
                type: DataTypes.TINYINT,
            },
            date: {
                type: DataTypes.DATE,
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
                              Dumpsters,
                          }: {
    Dumpsters: ModelStatic<Model<DumpsterAttributes, DumpsterCreationAttributes>>;
}) {
    // do associations like
    // Thing.hasMany()
    // using the supplied Models object
}