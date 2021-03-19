import Position from "./Position";

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
        this.info = info;
    }
}

export default Dumpster;
