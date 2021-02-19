import axios from "axios";
import {DumpsterService as DumpsterServiceClass} from "./DumpsterService";

// Create one single instance of Axios
// TODO replace dotenv usage or do sth else
const axiosInstance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:3000/",
    timeout: 1000
})

const DumpsterService = new DumpsterServiceClass(axiosInstance);

// Inject that instance into the services and export them
export {
    DumpsterService
}

