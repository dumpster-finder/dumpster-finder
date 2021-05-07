import { AxiosInstance } from "axios";
import Report from "../models/Report";

export default class ReportService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Add a report on a dumpster
     *
     * @param dumpsterID ID of the dumpster that is reported
     * @param reason Optional reason for the report
     */
    addOne(dumpsterID: number, reason: string | undefined): Promise<void> {
        return this.axios
            .post(`/dumpsters/${dumpsterID}/reports`, {
                reason: reason || null,
            })
            .then(response => response.data);
    }

    /**
     * Fetches your report of the given dumpster
     *
     * @param dumpsterID ID of the dumpster to get your report of
     */
    getOne(dumpsterID: number): Promise<Report> {
        return this.axios
            .get(`/dumpsters/${dumpsterID}/reports/mine`)
            .then(response => response.data);
    }
}
