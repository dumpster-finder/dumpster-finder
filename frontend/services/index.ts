import axios from "axios";
import DumpsterServiceClass from "./DumpsterService";
import DumpsterTypeServiceClass from "./DumpsterTypeService";
import StoreTypeServiceClass from "./StoreTypeService";
import CategoryServiceClass from "./CategoryService";
import PlaceServiceClass from "./PlaceService";
import CommentServiceClass from "./CommentService";
import ContentServiceClass from "./ContentService";
import Constants from "expo-constants";

// Create one single instance of Axios
const axiosInstance = axios.create({
    baseURL: Constants.manifest.extra.apiURL || "http://localhost:3000/api/",
    timeout: 1000,
});

console.log(`Server address is ${axiosInstance.defaults.baseURL}`);

// Inject that instance into the services
const DumpsterService = new DumpsterServiceClass(axiosInstance);
const DumpsterTypeService = new DumpsterTypeServiceClass(axiosInstance);
const StoreTypeService = new StoreTypeServiceClass(axiosInstance);
const CategoryService = new CategoryServiceClass(axiosInstance);
const PlaceService = new PlaceServiceClass(axiosInstance);
const CommentService = new CommentServiceClass(axiosInstance);
const ContentService = new ContentServiceClass(axiosInstance);

// and export them
export {
    DumpsterService,
    DumpsterTypeService,
    StoreTypeService,
    CategoryService,
    PlaceService,
    CommentService,
    ContentService,
};
