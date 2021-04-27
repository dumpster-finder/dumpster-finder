import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import RatingsDAO from "../ratings";
import DumpsterDAO from "../dumpsters";

const ratingsDAO = RatingsDAO(Models);
const dumpsterDAO = DumpsterDAO(Models);

beforeAll(setupTestData);

describe("addOne", () => {
    it("should add a new rating to the database", async () => {
        const rating = await ratingsDAO.addOne(7, 4, 4);
        const ratingAfter = await dumpsterDAO
            .getOne(7, "2020-01-01")
            // @ts-ignore
            .then(data => data.rating);
        expect(ratingAfter).toBe(3);
    });
});

describe("updateOne", () => {
    it("should update an existing rating for a dumpster", async () => {
        const rating = await ratingsDAO.updateOne(2, 1, 4);
        const ratingAfter = await dumpsterDAO
            .getOne(1, "2020-01-01")
            // @ts-ignore
            .then(data => data.rating);
        expect(ratingAfter).toBe(4);
    });
});
