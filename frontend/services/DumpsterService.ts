import {AxiosInstance} from "axios";
import Position from "../models/Position";
import Dumpster from "../models/Dumpster";

export class DumpsterService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    getDumpster(dumpsterID: number) {

    }

    /**
     * Fetches dumpsters in a given radius around a position
     *
     * @param position The location around which to fetch dumpsters
     * @param radius   How far around the location a dumpster can be
     * @return         A promise which resolves to a list of dumpsters
     */
    getNearbyDumpsters(position: Position, radius: number) {
        return new Promise<Dumpster[]>(resolve => resolve([]));
    }

    editDumpster(dumpster: Dumpster) {

    }

    addDumpster(dumpster: Omit<Dumpster, "dumpsterID" | "rating">) {
        console.log(dumpster);
    }
}
