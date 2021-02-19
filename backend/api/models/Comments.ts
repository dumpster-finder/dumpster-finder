import {Sequelize, DataTypes, Optional, Model, ModelStatic} from "sequelize";
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
                allowNull: false,
            },
            nickname: {
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
                defaultValue: 0
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
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