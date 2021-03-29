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

describe("getAll()", () => {
    it("should find the contents of a dumpster", async () => {
        const contents = await contentDAO.getAll(1);
        // Exclude foundDate from check since that varies by time of initialization
        // TODO perhaps write explicit dates there?
        expect(contents.map(({ foundDate, ...rest }) => ({ ...rest }))).toEqual(
            [
                {
                    name: "Cheese",
                    amount: 23,
                    unit: "pieces",
                    expiryDate: new Date("2023-04-30"),
                },
                {
                    name: "Milk",
                    amount: 23,
                    unit: "liters",
                    expiryDate: new Date("2021-03-30"),
                },
            ],
        );
        contents.forEach(c => expect(c).toHaveProperty("foundDate"));
    });

    it("should fail if the dumpster does not exist", async () => {
        await expect(contentDAO.getAll(387)).rejects.not.toBeUndefined();
    });
});

describe("addOne()", () => {
    it("should add valid content successfully", async () => {
        const content = {
            name: "Milk",
            amount: 23,
            unit: "liters",
            expiryDate: new Date("2021-08-26"),
        };
        const { foundDate, ...result } = await contentDAO.addOne(2, content);
        expect(result).toEqual(content);
        expect(foundDate).toBeInstanceOf(Date);
    });

    it("should add a new content type if it does not exist", async () => {
        const name = "Avocado";
        await contentDAO.addOne(2, {
            name,
            amount: 2,
            expiryDate: new Date("2021-04-01"),
        });
        const match = await Models.Tags.findOne({ where: { name } });
        expect(match).not.toBeNull();
        expect(match?.name).toBe(name);
        expect(match?.tagID).toBeGreaterThan(2);
    });
});
