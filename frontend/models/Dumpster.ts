import Position from "./Position";

export interface RevDumpster {
    revisionID: number;
    dumpsterID: number;
    name: string;
    position: Position;
    emptyingSchedule: string;
    locked: boolean;
    positiveStoreViewOnDiving: boolean | null;
    cleanliness: number;
    rating: number;
    dumpsterType: string;
    storeType: string;
    categories: string[];
    info: string;
    dateUpdated: string;
    isActive: boolean;
}

class Dumpster {
    dumpsterID: number;
    name: string;
    position: Position;
    emptyingSchedule: string;
    locked: boolean;
    positiveStoreViewOnDiving: boolean | null;
    cleanliness: number;
    rating: number;
    dumpsterType: string;
    storeType: string;
    categories: string[];
    info: string;

    constructor({
        dumpsterID,
        name,
        position,
        emptyingSchedule,
        locked,
        positiveStoreViewOnDiving,
        cleanliness,
        rating,
        dumpsterType,
        storeType,
        categories,
        info,
    }: {
        dumpsterID: number;
        name: string;
        position: Position;
        emptyingSchedule: string;
        locked: boolean;
        positiveStoreViewOnDiving: boolean | null;
        cleanliness: number;
        rating: number;
        dumpsterType: string;
        storeType: string;
        categories: string[];
        info: string;
    }) {
        this.dumpsterID = dumpsterID;
        this.name = name;
        this.position = position;
        this.emptyingSchedule = emptyingSchedule;
        this.locked = locked;
        this.positiveStoreViewOnDiving = positiveStoreViewOnDiving;
        this.cleanliness = cleanliness;
        this.rating = rating;
        this.dumpsterType = dumpsterType;
        this.storeType = storeType;
        this.categories = categories;
        this.info = info;
    }
}

export default Dumpster;
