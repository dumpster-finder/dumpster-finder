import { setupTestData } from "../../config/testSetup";
import Models from "../../models";
import DumpsterDAO from "../dumpsters";

const dumpsterDAO = DumpsterDAO(Models);

beforeAll(setupTestData);

const params = {
    latitude: 63.411402,
    longitude: 10.434184,
    radius: 5000,
    visitSinceDate: "2020-01-01",
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

const baseDumpsterProps = [
    "name",
    "position",
    "emptyingSchedule",
    "categories",
    "cleanliness",
    "dumpsterType",
    "storeType",
    "info",
    "locked",
    "positiveStoreViewOnDiving",
];

const dumpsterProps = [...baseDumpsterProps, "rating", "visits"];

const revisionProps = [
    ...baseDumpsterProps,
    "dateUpdated",
    "revisionID",
    "isActive",
];

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
            dumpsters.find(({ name }) => name === "Rema 1000 Stjørdal"),
        ).toBeUndefined();
        expect(
            // About 6 km away
            dumpsters.find(({ name }) => name === "City Syd Tiller"),
        ).toBeUndefined();
    });

    it("should return dumpsters with the usual data", async () => {
        const dumpsters = await dumpsterDAO.getAll(params);
        dumpsters.forEach(d =>
            dumpsterProps.forEach(p => expect(d).toHaveProperty(p)),
        );
    });
});

describe("getOne", () => {
    it("should return the correct dumpster", async () => {
        const dumpster = await dumpsterDAO.getOne(5, "2020-01-01");
        expect(dumpster).not.toBeNull();
        if (dumpster) {
            expect(dumpster.name).toBe("Bunnpris Moholt");
            expect(dumpster.info).toBe(
                "Somewhat dirty. Watch where you touch.",
            );
            expect(dumpster.emptyingSchedule).toBe("Fridays at 15pm");
            expect(dumpster.locked).toBeTruthy();
            expect(dumpster.cleanliness).toBe(3);
            expect(dumpster.position).toEqual({
                latitude: 63.41293,
                longitude: 10.431018,
            });
            // TODO check IDs when types are reworked to integers...
            expect(dumpster.storeType).toEqual("Grocery Store");
            expect(dumpster.dumpsterType).toEqual("Compressor");
            expect(dumpster.rating).toBe(1);
            expect(dumpster.visits).toBe(4);
        }
    });

    it("should return null if the dumpster does not exist", async () => {
        const dumpster = await dumpsterDAO.getOne(56709, "2020-01-01");
        expect(dumpster).toBeNull();
    });

    it("should return a dumpster with the usual data", async () => {
        const dumpster = await dumpsterDAO.getOne(1, "2020-01-01");
        dumpsterProps.forEach(p => expect(dumpster).toHaveProperty(p));
    });
});

describe("getRevisions", () => {
    it("should return all revisions", async () => {
        const revisions = await dumpsterDAO.getRevisions(4);
        // Check length
        expect(revisions).toHaveLength(3);
        // Check changes
        expect(revisions.map(r => r.name)).toEqual([
            "Rema 1000 Moholt",
            "Rema 1000 Loholt",
            "Rema 1000 Loholt",
        ]);
        expect(revisions.map(r => r.emptyingSchedule)).toEqual([
            "Second Thursday every month",
            "Second Thursday every month",
            "Second Bursday every month",
        ]);
    });

    it("should return objects with the usual dumpster data", async () => {
        const revisions = await dumpsterDAO.getRevisions(4);
        revisions.forEach(r =>
            revisionProps.forEach(p => expect(r).toHaveProperty(p)),
        );
    });

    it("should indicate that only *one* revision is active at a time", async () => {
        const revisions = await dumpsterDAO.getRevisions(4);
        const activeRevisions = revisions.filter(r => r.isActive);
        expect(activeRevisions).toHaveLength(1);
        expect(activeRevisions[0].revisionID).toBe(4);
    });
});

describe("setCurrentRevision", () => {
    it("should revert to an actual revision of that dumpster", async () => {
        const res = await dumpsterDAO.setActiveRevision(7, 79);
        const dp = await Models.DumpsterPositions.findOne({
            where: {
                dumpsterID: 7,
            },
        });
        expect(dp).not.toBeNull();
        // Expect to find what we reverted to
        expect(dp?.revisionID).toEqual(79);
    });

    it("should not revert to a revision of a different dumpster", async () => {
        await expect(
            dumpsterDAO.setActiveRevision(1, 2),
        ).rejects.not.toBeUndefined();
    });

    it("should not revert to a revision that does not exist", async () => {
        await expect(
            dumpsterDAO.setActiveRevision(2, 2325325325),
        ).rejects.not.toBeUndefined();
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

        const {
            dumpsterID,
            rating,
            visits,
            ...result
        } = await dumpsterDAO.addOne(dumpster);
        // Check that the actual data is returned
        expect(result).toEqual(dumpster);
        // Check default values
        expect(rating).toBe(2.5);
        expect(visits).toBe(0);

        // Check DumpsterPosition record
        const dumpsterPosition = await Models.DumpsterPositions.findOne({
            where: { dumpsterID },
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
            visits: undefined,
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
        const visibleResult = await dumpsterDAO.getOne(
            dumpster.dumpsterID,
            "2020-01-01",
        );
        expect({
            ...visibleResult,
            rating: undefined,
            visits: undefined,
        }).toEqual(dumpster);
    });
});
