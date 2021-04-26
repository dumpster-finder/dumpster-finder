import { applyFilter } from "../filter";
import Dumpster from "../../models/Dumpster";

const template = (rest: Partial<Dumpster>): Dumpster => ({
    name: "None",
    dumpsterID: 0,
    dumpsterType: "None",
    storeType: "None",
    position: {
        latitude: 0,
        longitude: 0,
    },
    positiveStoreViewOnDiving: false,
    locked: true,
    categories: [],
    cleanliness: 2.5,
    rating: 2.5,
    visits: 0,
    distance: 0,
    info: "",
    emptyingSchedule: "",
    ...rest,
});

const dumpsters = [
    template({
        name: "Unlocked dumpster 1",
        dumpsterType: "Small Container",
        storeType: "Bakery",
        positiveStoreViewOnDiving: null,
        locked: false,
        categories: ["Vegetables", "Eggs"],
        cleanliness: 1,
        rating: 2,
    }),
    template({
        name: "Unlocked dumpster 2",
        dumpsterType: "Large Container",
        storeType: "General Store",
        positiveStoreViewOnDiving: true,
        locked: false,
        categories: ["Meat", "Fruit", "Vegetables"],
        cleanliness: 3,
        rating: 4,
    }),
    template({
        name: "Locked dumpster 1",
        dumpsterType: "Large Container",
        storeType: "General Store",
        positiveStoreViewOnDiving: false,
        locked: true,
        categories: ["Meat", "Fruit"],
        cleanliness: 5,
        rating: 3,
    }),
    template({
        name: "Locked dumpster 2",
        dumpsterType: "Compressor",
        storeType: "Grocery Store",
        positiveStoreViewOnDiving: null,
        locked: true,
        categories: ["Bread", "Pastries", "Fish"],
        cleanliness: 4,
        rating: 1,
    }),
];

const toName = (d: Dumpster) => d.name;

describe("applyFilter", () => {
    it("should not filter anything when no filters are specified", () => {
        expect(applyFilter({})(dumpsters)).toEqual(dumpsters);
    });

    it("should filter locked/unlocked", () => {
        expect(
            applyFilter({
                locked: false,
            })(dumpsters).map(toName),
        ).toEqual(["Unlocked dumpster 1", "Unlocked dumpster 2"]);
        expect(
            applyFilter({
                locked: true,
            })(dumpsters).map(toName),
        ).toEqual(["Locked dumpster 1", "Locked dumpster 2"]);
    });

    it("should filter by store view", () => {
        // null, true, false, null
        expect(
            applyFilter({
                positiveStoreView: [1, 2],
            })(dumpsters).map(toName),
        ).toEqual([
            "Unlocked dumpster 1",
            "Unlocked dumpster 2",
            "Locked dumpster 2",
        ]);
        expect(
            applyFilter({
                positiveStoreView: [0, 1],
            })(dumpsters).map(toName),
        ).toEqual([
            "Unlocked dumpster 1",
            "Locked dumpster 1",
            "Locked dumpster 2",
        ]);
        expect(
            applyFilter({
                positiveStoreView: [0, 0],
            })(dumpsters).map(toName),
        ).toEqual(["Locked dumpster 1"]);
        expect(
            applyFilter({
                positiveStoreView: [0, 2],
            })(dumpsters),
        ).toEqual(dumpsters);
    });

    it("should filter by categories", () => {
        expect(
            applyFilter({
                categories: ["Meat", "Fruit"],
            })(dumpsters).map(toName),
        ).toEqual(["Unlocked dumpster 2", "Locked dumpster 1"]);
        expect(
            applyFilter({
                categories: ["Vegetables"],
            })(dumpsters).map(toName),
        ).toEqual(["Unlocked dumpster 1", "Unlocked dumpster 2"]);
    });

    it("should filter by dumpster types", () => {
        expect(
            applyFilter({
                dumpsterTypes: ["Large Container", "Small Container"],
            })(dumpsters).map(toName),
        ).toEqual([
            "Unlocked dumpster 1",
            "Unlocked dumpster 2",
            "Locked dumpster 1",
        ]);
        expect(
            applyFilter({
                dumpsterTypes: ["Compressor"],
            })(dumpsters).map(toName),
        ).toEqual(["Locked dumpster 2"]);
    });

    it("should filter by store types", () => {
        expect(
            applyFilter({
                storeTypes: ["General Store", "Bakery"],
            })(dumpsters).map(toName),
        ).toEqual([
            "Unlocked dumpster 1",
            "Unlocked dumpster 2",
            "Locked dumpster 1",
        ]);
        expect(
            applyFilter({
                storeTypes: ["Bakery"],
            })(dumpsters).map(toName),
        ).toEqual(["Unlocked dumpster 1"]);
    });

    it("should filter by rating", () => {
        expect(
            applyFilter({
                rating: [2, 4],
            })(dumpsters).map(toName),
        ).toEqual([
            "Unlocked dumpster 1",
            "Unlocked dumpster 2",
            "Locked dumpster 1",
        ]);
        expect(
            applyFilter({
                rating: [1, 2],
            })(dumpsters).map(toName),
        ).toEqual(["Unlocked dumpster 1", "Locked dumpster 2"]);
        expect(
            applyFilter({
                rating: [1, 1],
            })(dumpsters).map(toName),
        ).toEqual(["Locked dumpster 2"]);
        expect(
            applyFilter({
                rating: [1, 5],
            })(dumpsters),
        ).toEqual(dumpsters);
    });

    it("should filter by cleanliness", () => {
        expect(
            applyFilter({
                cleanliness: [2, 4],
            })(dumpsters).map(toName),
        ).toEqual(["Unlocked dumpster 2", "Locked dumpster 2"]);
        expect(
            applyFilter({
                cleanliness: [4, 5],
            })(dumpsters).map(toName),
        ).toEqual(["Locked dumpster 1", "Locked dumpster 2"]);
        expect(
            applyFilter({
                cleanliness: [1, 1],
            })(dumpsters).map(toName),
        ).toEqual(["Unlocked dumpster 1"]);
        expect(
            applyFilter({
                cleanliness: [1, 5],
            })(dumpsters),
        ).toEqual(dumpsters);
    });
});
