import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import RatingsDAO from "../ratings";
import DumpsterDAO from "../dumpsters";

const ratingsDAO = RatingsDAO(Models);
const dumpsterDAO = DumpsterDAO(Models);

beforeAll(setupTestData);

describe("addOne", () => {
    it("should add a new rating to the database", async () => {
        const visitsBefore = await dumpsterDAO
            .getOne(7, "2020-01-01")
            // @ts-ignore
            .then(data => data.rating);
        const rating = await ratingsDAO.addOne(7, 4, 4);
        const visitsAfter = await dumpsterDAO
            .getOne(7, "2020-01-01")
            // @ts-ignore
            .then(data => data.rating);
        expect(visitsAfter).toBe(3);
    });
});

describe("updateOne", () => {
    it("should update an existing rating for a dumpster", async () => {
        const visitsBefore = await dumpsterDAO
            .getOne(1, "2020-01-01")
            // @ts-ignore
            .then(data => data.rating);
        const rating = await ratingsDAO.updateOne(1, 4, 2);
        const visitsAfter = await dumpsterDAO
            .getOne(1, "2020-01-01")
            // @ts-ignore
            .then(data => data.rating);
        expect(visitsAfter).toBe(4);
    });
});
