import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import DumpsterDAO from "../dumpsters";

const dumpsterDAO = DumpsterDAO(Models);

beforeAll(setupTestData);

const params = {
    latitude: 63.411402,
    longitude: 10.434184,
    radius: 5000,
};

describe("getAll", () => {
    it("should return a list of known dumpsters", async () => {
        const dumpsters = await dumpsterDAO.getAll(params);
        expect(dumpsters.length).toBeGreaterThan(0);
        expect(
            dumpsters.find(({ name }) => name === "Tore's store"),
        ).not.toBeUndefined();
        expect(
            dumpsters.find(({ name }) => name === "Helen's store"),
        ).not.toBeUndefined();
        expect(
            dumpsters.find(({ name }) => name === "Jon's store"),
        ).not.toBeUndefined();
    });

    it("should limit the search by position and radius", async () => {
        const dumpsters = await dumpsterDAO.getAll(params);
        expect(
            dumpsters.find(({ name }) => name === "Far away store"),
        ).toBeUndefined();
    });
});

describe("getOne", () => {
    it("should return the correct dumpster", async () => {
        const dumpster = await dumpsterDAO.getOne(1);
        expect(dumpster).not.toBeNull();
        if (dumpster) {
            expect(dumpster.name).toBe("Tore's store");
            expect(dumpster.emptyingSchedule).toBe(
                "First Tuesday in the month",
            );
            expect(dumpster.locked).toBeFalsy();
            expect(dumpster.cleanliness).toBe(5);
            expect(dumpster.position).toEqual({
                latitude: 63.411402,
                longitude: 10.434084,
            });
            // TODO check IDs when types are reworked to integers...
            expect(dumpster.storeType).toEqual("Grocery Store");
            expect(dumpster.dumpsterType).toEqual("Compressor");
        }
    });

    it("should return null if the dumpster does not exist", async () => {
        const dumpster = await dumpsterDAO.getOne(56709);
        expect(dumpster).toBeNull();
    });
});
