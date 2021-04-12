import { AxiosInstance } from "axios";
import Position from "../models/Position";
import Dumpster, { RevDumpster } from "../models/Dumpster";
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
        console.log("Fetched dumpster with ID", dumpsterID);
        return this.axios.get(`/dumpsters/${dumpsterID}`);
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

    getRevisions(dumpsterID: number) {
        return this.axios
            .get(`/dumpsters/${dumpsterID}/revisions`)
            .then(response => response.data.map((rev: RevDumpster) => rev));
    }

    setRevision(dumpsterID: number, revisionID: number) {
        return this.axios
            .patch(`/dumpsters/${dumpsterID}/revisions`, { revisionID })
            .then(response => response.data);
    }
}
