import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import ContentDAO from "../contents";
import _ from "lodash";

const contentDAO = ContentDAO(Models);

beforeAll(setupTestData);

describe("getStandardContentTypes()", () => {
    it("should find all standard content types", async () => {
        const types = await contentDAO.getStandardContentTypes();
        const names = types.map(t => t.name);
        expect(names).toContain("Milk");
        expect(names).toContain("Cheese");
        expect(names).toContain("Potatoes");
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
                    // Most recently found first
                    name: "Milk",
                    amount: 23,
                    unit: "liters",
                    quality: 3,
                    expiryDate: new Date("2021-03-30"),
                },
                {
                    name: "Cheese",
                    amount: 23,
                    unit: "pieces",
                    quality: 3,
                    expiryDate: new Date("2023-04-30"),
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
            unit: "liters", // omitting quality
            expiryDate: new Date("2021-08-26"),
        };
        const { foundDate, ...result } = await contentDAO.addOne(2, content);
        expect(result).toEqual({ quality: null, ...content }); // Sequelize only sends null, not undefined, back
        expect(foundDate).toBeInstanceOf(Date);
    });

    it("should add a new content type if it does not exist", async () => {
        const name = "Avocado";
        await contentDAO.addOne(2, {
            name,
            amount: 2, // omitting unit
            quality: 4,
            expiryDate: new Date("2021-04-01"),
        });
        const match = await Models.Tags.findOne({ where: { name } });
        expect(match).not.toBeNull();
        expect(match?.name).toBe(name);
        expect(match?.tagID).toBeGreaterThan(2);
    });
});

describe("updateOne()", () => {
    it("should update content entry", async () => {
        const content = {
            name: "Potatoes",
            amount: 1.5,
            unit: "kilos",
            quality: 3,
            expiryDate: new Date("2021-08-26"),
            foundDate: new Date("2021-03-28"),
        };
        const result = await contentDAO.updateOne(3, content);
        expect(result).toEqual(content);
    });

    it("should refrain from modifying data that is not given", async () => {
        const content = {
            name: "Squash",
            amount: 5, // not specifying quality
            expiryDate: new Date("2021-08-26"),
            foundDate: new Date("2021-03-17"),
        };
        const result = await contentDAO.updateOne(3, content);
        // Here, quality should be unchanged
        expect(result).toEqual({ quality: 3, unit: null, ...content });
    });
});

describe("removeOne()", () => {
    it("should delete only one content entry", async () => {
        const identifier = {
            name: "Potatoes",
            foundDate: new Date("2021-03-20"),
        };
        // Remove it
        const result = await contentDAO.removeOne(7, identifier);
        // Make sure only one is found
        expect(result).toEqual(1);
    });

    it("should delete content in the correct dumpster", async () => {
        const identifier = {
            name: "Milk chocolate",
            foundDate: new Date("2021-02-28"),
        };
        // Remove it
        const result = await contentDAO.removeOne(6, identifier);
        expect(result).toEqual(1);
        // See if you can find this piece of content in the db anymore
        const possibleLeftovers = await contentDAO.getAll(6);
        expect(
            possibleLeftovers.find(({ name, foundDate }) =>
                _.isEqual({ name, foundDate }, identifier),
            ),
        ).toBeUndefined();
    });
});
