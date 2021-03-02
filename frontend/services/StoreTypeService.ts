import { AxiosInstance } from "axios";
import { StoreType } from "../models/Constants";

export default class StoreTypeService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    getAll(): Promise<StoreType[]> {
        return this.axios.get("/store-types").then(response => response.data);
    }
}
