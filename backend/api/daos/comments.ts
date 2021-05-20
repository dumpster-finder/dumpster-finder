import { literal, Op } from "sequelize";
import { MyModels } from "../models";
import Comment, { PostComment } from "../types/Comment";
import {
    InvalidDataError,
    NotFoundError,
    ServerError,
    UnknownError,
} from "../types/errors";
import { CommentAttributes } from "../models/Comments";

export const COMMENT_RATING_TRESHOLD = -5;

/**
 * Maps a db comment to a comment returned from POSTing a comment,
 * in which case we already know that this is *your* comment.
 */
const postToComment = ({
    commentID,
    dumpsterID,
    nickname,
    comment,
    rating,
    date,
}: CommentAttributes): Comment => ({
    commentID,
    dumpsterID,
    nickname,
    comment,
    rating,
    date,
    mine: true,
});

/**
 * Maps a db comment to a comment returned from fetching comments,
 * in which case we have no idea which ones are your comments & have to check.
 */
const allToComment = (myUserID: number) => ({
    commentID,
    dumpsterID,
    userID,
    nickname,
    comment,
    rating,
    date,
}: CommentAttributes): Comment => ({
    commentID,
    dumpsterID,
    nickname,
    comment,
    rating,
    date,
    mine: userID == myUserID,
});

export default function({ Comments, sequelize }: MyModels) {
    return {
        /**
         * Fetches all comments for a dumpster,
         * placing the most recent ones first.
         *
         * @param dumpsterID   ID of the dumpster to fetch comments for
         * @param userID       ID of the user requesting a list of comments
         * @param showNegative Whether the endpoint should return comments with a rating below -5
         */
        getAllForDumpster: async (
            dumpsterID: number,
            userID: number,
            { showNegative = false } = {},
        ): Promise<Comment[]> => {
            const where: any = { dumpsterID };
            if (!showNegative) {
                where["rating"] = {
                    [Op.gte]: COMMENT_RATING_TRESHOLD,
                };
            }
            return (await Comments.findAll({
                where,
                limit: 100,
                order: [["date", "DESC"]],
            })).map(allToComment(userID));
        },

        /**
         * Adds a comment to a dumpster, returning the inserted entity
         *
         * @param comment
         */
        addOne: async (comment: PostComment): Promise<Comment> => {
            return await sequelize.transaction(async t => {
                const { commentID } = await Comments.create(comment, {
                    transaction: t,
                });
                const result = await Comments.findOne({
                    where: { commentID },
                    transaction: t,
                });
                if (!result)
                    throw new UnknownError("Could not find created comment");
                return postToComment(result);
            });
        },

        /**
         * Change a comment's rating by a given vote value.
         * Allows |vote| = 2 since users might turn their upvote into a downvote and vice versa.
         *
         * @param commentID ID of the comment the user has voted on
         * @param vote      Vote to cast, in the set {-2, -1, 1, 2}
         */
        changeVote: async (commentID: number, vote: number) => {
            if (![-2, -1, 1, 2].includes(vote))
                throw new InvalidDataError(
                    "Votes must be one of -2, -1, 1 or 2",
                );

            return await sequelize.transaction(async t => {
                const [numberUpdated, _] = await Comments.update(
                    {
                        //@ts-ignore
                        rating: literal(
                            `(rating + (${sequelize.escape(vote)}))`,
                        ),
                    },
                    { where: { commentID }, transaction: t },
                );
                if (numberUpdated > 1)
                    throw new ServerError(
                        `Updated ${numberUpdated} comments, but only one should be updated`,
                    );
                else if (numberUpdated === 0)
                    throw new NotFoundError("No such comment");
                return Comments.findOne({
                    where: { commentID },
                    transaction: t,
                });
            });
        },

        /**
         * Delete a comment
         *
         * @param commentID ID of the comment the user want to delete
         * @param userID    ID of the user who wants to delete said comment
         */
        removeOne: async (commentID: number, userID: number) => {
            return await sequelize.transaction(async t => {
                const match = await Comments.findOne({
                    where: { commentID, userID },
                    transaction: t,
                });
                if (!match)
                    throw new NotFoundError("This comment does not exist");
                return await Comments.destroy({
                    where: { commentID: match.commentID, userID: match.userID },
                });
            });
        },
    };
}
