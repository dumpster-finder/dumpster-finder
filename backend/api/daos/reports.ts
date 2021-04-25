import { MyModels } from "../models";

export default function({ Reports }: MyModels) {
    return {
        addOne: (
            dumpsterID: number,
            userID: number,
            reason: string | undefined,
        ) => Reports.create({ dumpsterID, userID, reason }),

        getAllForDumpster: async (dumpsterID: number) => {
            const where: any = { dumpsterID };
            return await Reports.findAll({
                where,
            });
        },
    };
}
