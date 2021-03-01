import axios from "axios";
import {DumpsterService as DumpsterServiceClass} from "./DumpsterService";
import Constants from "expo-constants";

// Create one single instance of Axios
const axiosInstance = axios.create({
    baseURL: Constants.manifest.extra.apiURL || "http://localhost:3000/",
    timeout: 1000
})

console.log(`Server address is ${axiosInstance.defaults.baseURL}`);

const DumpsterService = new DumpsterServiceClass(axiosInstance);

// Inject that instance into the services and export them
export {
    DumpsterService
}

