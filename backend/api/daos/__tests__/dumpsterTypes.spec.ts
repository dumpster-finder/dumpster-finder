import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import DumpsterTypeDAO from "../dumpsterTypes";

const dumpsterTypeDAO = DumpsterTypeDAO(Models);

beforeAll(setupTestData);

describe("getAll", () => {
    it("should return all dumpster types", async () => {
        const dumpsterTypes = await dumpsterTypeDAO.getAll();
        expect(dumpsterTypes.map(({ name }) => name)).toEqual([
            "Compressor",
            "Large Container",
            "Small Container",
            "Trash Bin",
        ]);
    });
});
