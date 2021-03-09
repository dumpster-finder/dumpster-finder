import Position from "./Position";

export default interface Dumpster {
    dumpsterID: number;
    name: string;
    position: Position;
    emptyingSchedule: string; // no longer different from frontend...
    locked: boolean;
    positiveStoreViewOnDiving: boolean | null;
    cleanliness: number;
    rating: number;
    dumpsterType: string;
    storeType: string;
    categories: string[];
    info: string;
}
