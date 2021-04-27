import { MyModels } from "../models";

export default function({ Visits, sequelize }: MyModels) {
    return {
        addOne: (dumpsterID: number, userID: number) =>
            Visits.create({ dumpsterID, userID }),
    };
}
