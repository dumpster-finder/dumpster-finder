import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import DumpsterTypeDAO from "../dumpsterTypes";

const dumpsterTypeDAO = DumpsterTypeDAO(Models);

beforeAll(setupTestData);

describe("postOne", () => {
    it("", async () => {
        const dumpsterTypes = await dumpsterTypeDAO.getAll();

    });
});
