import { AxiosInstance } from "axios";
import Visit from "../models/Visit";

export default class VisitService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Add a visit to a given dumpster
     *
     * @param dumpsterID ID of the dumpster that is visited
     * @param userID ID of the user who has visited
     */
    addOne(dumpsterID: number, userID: string): Promise<Visit> {
        return this.axios
            .post(`/dumpsters/${dumpsterID}/visits`, {
                userID,
            })
            .then(response => response.data);
    }
}
