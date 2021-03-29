import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import ContentDAO from "../contents";

const contentDAO = ContentDAO(Models);

beforeAll(setupTestData);

describe("getStandardContentTypes()", () => {
    it("should find all standard content types", async () => {
        const types = await contentDAO.getStandardContentTypes();
        const names = types.map(t => t.name);
        expect(names).toContain("Milk");
        expect(names).toContain("Cheese");
    });

    it("should return correctly formatted objects", async () => {
        const types = await contentDAO.getStandardContentTypes();
        types.forEach(t => {
            expect(t).toHaveProperty("contentID");
            expect(t).toHaveProperty("categoryID");
            expect(t).toHaveProperty("name");
        });
    });
});
