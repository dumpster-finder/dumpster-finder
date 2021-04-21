import { AxiosInstance } from "axios";
import Report from "../models/Report";

export default class ReportService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    addOne(
        dumpsterID: number,
        userID: string,
        reason: string | undefined,
    ): Promise<Report> {
        return this.axios
            .post(`/dumpsters/${dumpsterID}/reports`, {
                userID,
                reason,
            })
            .then(response => response.data);
    }

    getAll(dumpsterID: number): Promise<Report[]> {
        return this.axios
            .get(`/dumpsters/${dumpsterID}/reports`)
            .then(response => response.data);
    }
}
