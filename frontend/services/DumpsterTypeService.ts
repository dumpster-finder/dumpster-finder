import { AxiosInstance } from "axios";
import { DumpsterType } from "../models/Constants";

export default class DumpsterTypeService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    getAll(): Promise<DumpsterType[]> {
        return this.axios.get("/dumpster-types").then(response => response.data);
    }
}
