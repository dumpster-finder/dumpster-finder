import { MyModels } from "../models";

export default function({ Reports, sequelize }: MyModels) {
    return {
        addOne: (
            dumpsterID: number,
            userID: string,
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
