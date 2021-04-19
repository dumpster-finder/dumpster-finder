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
    visits: number;
    dateUpdated: string;
    isActive: boolean;
}

export default class Dumpster {
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
    visits: number;
    distance?: number;

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
        visits,
        distance,
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
        visits: number;
        distance?: number;
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
        this.visits = visits;
        this.distance = distance;
    }
}

export type UpdatedDumpster = Omit<Dumpster, "rating" | "visits">; // wait, what sense does this make?
export type PostDumpster = Omit<Dumpster, "dumpsterID" | "rating" | "visits">;
