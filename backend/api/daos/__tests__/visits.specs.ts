import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import VisitsDAO from "../visits";
import DumpsterDAO from "../dumpsters";

const visitsDAO = VisitsDAO(Models);
const dumpsterDAO = DumpsterDAO(Models);

beforeAll(setupTestData);

describe("addOne", () => {
    it("should add a new visit to the database", async () => {
        const visitsBefore = await dumpsterDAO
            .getOne(1)
            // @ts-ignore
            .then(data => data.visits);
        const visit = await visitsDAO.addOne(1, 1);
        const visitsAfter = await dumpsterDAO
            .getOne(1)
            // @ts-ignore
            .then(data => data.visits);
        expect(visitsAfter).toBe(visitsBefore + 1);
    });
});
