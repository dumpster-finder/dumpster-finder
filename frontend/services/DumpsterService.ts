import { AxiosInstance } from "axios";
import Position from "../models/Position";
import Dumpster from "../models/Dumpster";
import { testDumpsters } from "../constants/TestData";

export default class DumpsterService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Fetches a single dumpster by ID
     * TODO Retrieves the dumpster from the cache if it is present
     *
     * @param dumpsterID ID of the dumpster to fetch
     */
    getDumpster(dumpsterID: number) {
        // TODO eventually this'll become
        // return this.axios.get(`/dumpsters/${dumpsterID}`);
        console.log("Fetched dumpster with ID", dumpsterID);
        return new Promise<Dumpster>((resolve, reject) =>
            dumpsterID > 0 && dumpsterID < 4
                ? resolve(testDumpsters[dumpsterID + 1])
                : reject(),
        );
    }

    /**
     * Fetches dumpsters in a given radius around a position
     *
     * @param position The location around which to fetch dumpsters
     * @param radius   How far around the location a dumpster can be
     * @return         A promise which resolves to a list of dumpsters
     */
    getNearbyDumpsters(position: Position, radius: number) {
        console.log(
            `Fetched dumpsters ${radius} meters around (${position.latitude}, ${position.latitude})`,
        );
        return this.axios
            .get("/dumpsters", {
                params: {
                    ...position,
                    radius,
                },
            })
            .then(response => response.data);
    }

    /**
     * Updates a dumpster
     *
     * @param dumpster An edited version of an existing dumpster
     */
    updateDumpster(dumpster: Omit<Dumpster, "rating">): Promise<Dumpster> {
        console.log("Updated dumpster:", dumpster);
        return this.axios
            .put(`/dumpsters/${dumpster.dumpsterID}`, dumpster)
            .then(response => response.data);
    }

    /**
     * Adds a dumpster
     *
     * @param dumpster A dumpster object without ID or rating
     */
    addDumpster(
        dumpster: Omit<Dumpster, "dumpsterID" | "rating">,
    ): Promise<Dumpster> {
        console.log("Posted dumpster:", dumpster);
        return this.axios
            .post("/dumpsters", dumpster)
            .then(response => response.data);
    }
}
