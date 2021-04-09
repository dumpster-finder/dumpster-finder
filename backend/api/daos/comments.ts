import { literal, Op } from "sequelize";
import { MyModels } from "../models";
import Comment from "../types/Comment";
import { InvalidDataError, NotFoundError, ServerError } from "../types/errors";

export default function ({ Comments, sequelize }: MyModels) {
    return {
        /**
         * Fetches all comments for a dumpster,
         * placing the most recent ones first.
         *
         * @param dumpsterID
         */
        getAllForDumpster: async (
            dumpsterID: number,
            { showNegative = false } = {},
        ) => {
            const where: any = { dumpsterID };
            if (!showNegative) {
                where["rating"] = {
                    [Op.gte]: 0,
                };
            }
            return await Comments.findAll({
                where,
                order: [["date", "DESC"]],
            });
        },

        /**
         * Adds a comment to a dumpster, returning the inserted entity
         *
         * @param comment
         */
        addOne: async (comment: Omit<Comment, "commentID">) => {
            return await sequelize.transaction(async t => {
                const { commentID } = await Comments.create(comment, {
                    transaction: t,
                });
                return await Comments.findOne({
                    where: { commentID },
                    transaction: t,
                });
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
    };
}
