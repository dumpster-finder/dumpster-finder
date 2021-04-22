import { AxiosInstance } from "axios";
import Position from "../models/Position";
import Dumpster, { PostDumpster, RevDumpster } from "../models/Dumpster";
import { packToken } from "../utils/token";

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
     * @param visitSinceDate date limit for calculating visits
     */
    getDumpster(dumpsterID: number, visitSinceDate: string) {
        console.log("Fetched dumpster with ID", dumpsterID);
        return this.axios
            .get(`/dumpsters/${dumpsterID}`, {
                params: {
                    visitSinceDate,
                },
            })
            .then(response => response.data);
    }

    /**
     * Fetches dumpsters in a given radius around a position
     *
     * @param position The location around which to fetch dumpsters
     * @param radius   How far around the location a dumpster can be
     * @return         A promise which resolves to a list of dumpsters
     */
    getNearbyDumpsters(
        position: Position,
        radius: number,
        visitSinceDate: string,
    ) {
        console.log(
            `Fetched dumpsters ${radius} meters around (${position.latitude}, ${position.latitude})`,
        );
        return this.axios
            .get("/dumpsters", {
                params: {
                    ...position,
                    radius,
                    visitSinceDate,
                },
            })
            .then(response => response.data);
    }

    /**
     * Updates a dumpster
     *
     * @param dumpster An edited version of an existing dumpster
     * @param token    The current token
     */
    updateDumpster(dumpster: Dumpster, token: string): Promise<Dumpster> {
        console.log("Updated dumpster:", dumpster);
        return this.axios
            .put(
                `/dumpsters/${dumpster.dumpsterID}`,
                dumpster,
                packToken(token),
            )
            .then(response => response.data);
    }

    /**
     * Adds a dumpster
     *
     * @param dumpster A dumpster object without ID or rating
     * @param token    The current token
     */
    addDumpster(dumpster: PostDumpster, token: string): Promise<Dumpster> {
        console.log("Posted dumpster:", dumpster);
        return this.axios
            .post("/dumpsters", dumpster, packToken(token))
            .then(response => response.data);
    }

    getRevisions(dumpsterID: number) {
        return this.axios
            .get(`/dumpsters/${dumpsterID}/revisions`)
            .then(response => response.data.map((rev: RevDumpster) => rev));
    }

    setRevision(dumpsterID: number, revisionID: number, token: string) {
        return this.axios
            .patch(
                `/dumpsters/${dumpsterID}/revisions`,
                { revisionID },
                packToken(token),
            )
            .then(response => response.data);
    }
}
