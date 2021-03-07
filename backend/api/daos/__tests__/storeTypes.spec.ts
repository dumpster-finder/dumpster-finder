import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import StoreTypeDAO from "../storeTypes";

const storeTypeDAO = StoreTypeDAO(Models);

beforeAll(setupTestData);

describe("getAll", () => {
    it("should return all store types", async () => {
        const storeTypes = await storeTypeDAO.getAll();
        expect(storeTypes.length).toBeGreaterThan(0);
        expect(storeTypes.map(({ name }) => name)).toContain("Bakery");
        expect(storeTypes.map(({ name }) => name)).toContain("Grocery Store");
    });
});
