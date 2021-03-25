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
            dumpsters.find(({ name }) => name === "Bunnpris Moholt"),
        ).not.toBeUndefined();
        expect(
            dumpsters.find(({ name }) => name === "Trondheim Torg"),
        ).not.toBeUndefined();
        expect(
            dumpsters.find(({ name }) => name === "Rema 1000 Moholt"),
        ).not.toBeUndefined();
    });

    it("should limit the search by position and radius", async () => {
        const dumpsters = await dumpsterDAO.getAll(params);
        expect(
            // Far away
            dumpsters.find(({ name }) => name === "Elkjøp Stjørdal"),
        ).toBeUndefined();
        expect(
            // About 6 km away
            dumpsters.find(({ name }) => name === "City Syd Tiller"),
        ).toBeUndefined();
    });
});

describe("getOne", () => {
    it("should return the correct dumpster", async () => {
        const dumpster = await dumpsterDAO.getOne(5);
        expect(dumpster).not.toBeNull();
        if (dumpster) {
            expect(dumpster.name).toBe("Bunnpris Moholt");
            expect(dumpster.info).toBe(
                "Somewhat dirty. Watch where you touch.",
            );
            expect(dumpster.emptyingSchedule).toBe("Fridays at 15pm");
            expect(dumpster.locked).toBeFalsy();
            expect(dumpster.cleanliness).toBe(3);
            expect(dumpster.position).toEqual({
                latitude: 63.41293,
                longitude: 10.431018,
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
