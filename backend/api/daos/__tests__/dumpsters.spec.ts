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

const invalidDumpster = {
    name: "Spefff",
    position: {
        latitude: -123,
        longitude: 1815135,
    },
    emptyingSchedule: "",
    categories: ["No such category"],
    cleanliness: -32,
    dumpsterType: "Does not exist",
    // @ts-ignore
    info: null,
    locked: false,
    positiveStoreViewOnDiving: null,
    storeType: "Hahaha",
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

describe("addOne", () => {
    it("should reject invalid dumpsters", async () => {
        await expect(
            async () =>
                // @ts-ignore
                await dumpsterDAO.addOne(invalidDumpster),
        ).rejects.not.toBeUndefined();
    });

    it("should add valid dumpsters", async () => {
        const dumpster = {
            name: "Some Store",
            position: {
                latitude: 23.3,
                longitude: 24.4,
            },
            emptyingSchedule: "Sometimes",
            categories: ["Dairy", "Meat"],
            cleanliness: 3,
            storeType: "Grocery Store",
            dumpsterType: "Large Container",
            info: "obla di obla da",
            locked: false,
            positiveStoreViewOnDiving: true,
        };
        try {
            const result = await dumpsterDAO.addOne(dumpster);
            expect({
                ...result,
                rating: undefined,
                dumpsterID: undefined,
            }).toEqual(dumpster);

            // Check DumpsterPosition record
            const dumpsterPosition = await Models.DumpsterPositions.findOne({
                where: { dumpsterID: result.dumpsterID },
            });
            expect(dumpsterPosition).not.toBeNull();
            // @ts-ignore
            expect(dumpsterPosition?.position.coordinates[0]).toEqual(
                dumpster.position.latitude,
            );
            // @ts-ignore
            expect(dumpsterPosition?.position.coordinates[1]).toEqual(
                dumpster.position.longitude,
            );
            expect(dumpsterPosition?.revisionID).toBeGreaterThan(7);
        } catch (e) {
            fail("Threw an error when it should not");
        }
    });
});

describe("updateOne", () => {
    it("should reject invalid data", async () => {
        await expect(
            async () =>
                // @ts-ignore
                await dumpsterDAO.updateOne({
                    ...invalidDumpster,
                    dumpsterID: 3,
                }),
        ).rejects.not.toBeUndefined();
    });

    it("should update dumpsters correctly", async () => {
        const dumpster = {
            dumpsterID: 2,
            name: "Solsiden senter",
            position: {
                latitude: 63.435008,
                longitude: 10.410727,
            },
            emptyingSchedule: "Every week",
            categories: ["Dairy", "Meat"],
            cleanliness: 1,
            storeType: "Miscellaneous",
            dumpsterType: "Large Container",
            info:
                "Usually a lot of baked goods. Moved to the other side of the building.",
            locked: false,
            positiveStoreViewOnDiving: true,
        };
        try {
            // Remember the previous rev ID
            const previousDumpsterPosition = await Models.DumpsterPositions.findOne(
                {
                    where: { dumpsterID: dumpster.dumpsterID },
                },
            );

            // Update it!
            const result = await dumpsterDAO.updateOne(dumpster);
            expect({
                ...result,
                rating: undefined,
            }).toEqual(dumpster);

            // Check DumpsterPosition record
            const dumpsterPosition = await Models.DumpsterPositions.findOne({
                where: { dumpsterID: dumpster.dumpsterID },
            });
            // @ts-ignore
            expect(dumpsterPosition?.position.coordinates[0]).toEqual(
                dumpster.position.latitude,
            );
            // @ts-ignore
            expect(dumpsterPosition?.position.coordinates[1]).toEqual(
                dumpster.position.longitude,
            );
            // Make sure that the revision ID has been updated
            expect(dumpsterPosition?.revisionID).toBeGreaterThan(
                previousDumpsterPosition?.revisionID!,
            );

            // Check that the resulting dumpster matches our update
            const visibleResult = await dumpsterDAO.getOne(dumpster.dumpsterID);
            expect({
                ...visibleResult,
                rating: undefined,
            }).toEqual(dumpster);
        } catch (e) {
            fail("Threw an error when it should not");
        }
    });
});
