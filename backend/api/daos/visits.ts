import { MyModels } from "../models";

export default function({ Visits, sequelize }: MyModels) {
    return {
        addOne: (dumpsterID: number, userID: string) =>
            Visits.create({ dumpsterID, userID }),
    };
}
