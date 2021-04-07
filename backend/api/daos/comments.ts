import { literal } from "sequelize";
import { MyModels } from "../models";
import Comment from "../types/Comment";

export default function({ Comments, sequelize }: MyModels) {
    return {
        getAllForDumpster: async (dumpsterID: number) =>
            Comments.findAll({
                where: {
                    dumpsterID,
                },
            }),
        //MÅ KANKSJE ENDRES. GUD HJELP OSS
        addOne: async (comment: Omit<Comment, "commentID">) =>
            Comments.create(comment),
        updateOne: async (commentID: number, vote: number) =>
            Comments.update(
                //@ts-ignore
                { rating: literal(`(rating + (${sequelize.escape(vote)}))`) },
                { where: { commentID } },
            ),
    };
}
