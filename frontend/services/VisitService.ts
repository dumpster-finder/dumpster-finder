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
     */
    addOne(dumpsterID: number): Promise<Visit> {
        return this.axios
            .post(`/dumpsters/${dumpsterID}/visits`)
            .then(response => response.data);
    }
}
