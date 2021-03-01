import Position from "./Position";

export default interface Dumpster {
    dumpsterID: number;
    name: string;
    position: Position;
    emptyingSchedule: string | null; // TODO DANGER ZONE this is different on frontend
    locked: boolean;
    positiveStoreViewOnDiving: boolean | null;
    cleanliness: number;
    rating: number;
    dumpsterType: string;
    storeType: string;
}
