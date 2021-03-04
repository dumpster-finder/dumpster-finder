import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import CategoryDAO from "../categories";

const categoryDAO = CategoryDAO(Models);

beforeAll(setupTestData);

describe("getAll", () => {
    it("should return all categories", async done => {
        const categories = await categoryDAO.getAll();
        expect(categories.length).toBeGreaterThan(0);
        expect(
            categories.find(({ name }) => name === "Dairy"),
        ).not.toBeUndefined();
        expect(
            categories.find(({ name }) => name === "Meat"),
        ).not.toBeUndefined();
        expect(
            categories.find(({ name }) => name === "Vegetables"),
        ).not.toBeUndefined();
        done();
    });
});
