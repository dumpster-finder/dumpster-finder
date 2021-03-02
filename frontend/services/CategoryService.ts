import { AxiosInstance } from "axios";
import { Category } from "../models/Constants";

export default class CategoryService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    getAll(): Promise<Category[]> {
        return this.axios.get("/categories").then(response => response.data);
    }
}
