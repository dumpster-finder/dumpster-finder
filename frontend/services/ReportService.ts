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
    addOne(dumpsterID: number, reason: string | undefined): Promise<Report> {
        return this.axios
            .post(`/dumpsters/${dumpsterID}/reports`, {
                reason,
            })
            .then(response => response.data);
    }

    /**
     * Fetches all reports for given dumpster
     *
     * @param dumpsterID ID of the dumpster to get reports
     */
    getAll(dumpsterID: number): Promise<Report[]> {
        return this.axios
            .get(`/dumpsters/${dumpsterID}/reports`)
            .then(response => response.data);
    }
}
