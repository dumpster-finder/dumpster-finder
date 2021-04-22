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
     * @param userID ID of the user who reports the dumpster
     * @param reason Optional reason for the report
     */
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
