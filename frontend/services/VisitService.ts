import { AxiosInstance } from "axios";
import Visit from "../models/Visit";

export default class VisitService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    addOne(dumpsterID: number, userID: string): Promise<Visit> {
        return this.axios
            .post(`/dumpsters/${dumpsterID}/visits`, {
                userID,
            })
            .then(response => response.data);
    }
}
