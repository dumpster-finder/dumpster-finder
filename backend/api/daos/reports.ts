import { MyModels } from "../models";
import { NotFoundError } from "../types/errors";

export default function({ Reports }: MyModels) {
    return {
        addOne: (
            dumpsterID: number,
            userID: number,
            reason: string | undefined,
        ) => Reports.create({ dumpsterID, userID, reason }),

        getOne: async (dumpsterID: number, userID: number) => {
            const report = await Reports.findOne({
                where: { dumpsterID, userID },
            });
            if (!report) throw new NotFoundError("No such report");
            return {
                dumpsterID: report.dumpsterID,
                reason: report.reason,
                date: report.date,
            };
        },
    };
}
