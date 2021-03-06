import axios from "axios";
import DumpsterServiceClass from "./DumpsterService";
import DumpsterTypeServiceClass from "./DumpsterTypeService";
import StoreTypeServiceClass from "./StoreTypeService";
import CategoryServiceClass from "./CategoryService";
import PlaceServiceClass from "./PlaceService";
import CommentServiceClass from "./CommentService";
import ContentServiceClass from "./ContentService";
import PhotoServiceClass from "./PhotoService";
import VisitServiceClass from "./VisitService";
import UserServiceClass from "./UserService";
import ReportServiceClass from "./ReportService";
import RatingServiceClass from "./RatingService";
import Constants from "expo-constants";
import {
    addTokenHeader,
    handleTokenError,
    handleTokenResponse,
} from "../redux/tokenInterceptors";

// Create one single instance of Axios
const axiosInstance = axios.create({
    baseURL: Constants.manifest.extra.apiURL || "http://localhost:3000/api/",
    timeout: 1000,
});

// Add some interceptors for tokens (TODO call this after exports)
axiosInstance.interceptors.request.use(addTokenHeader);
axiosInstance.interceptors.response.use(handleTokenResponse, handleTokenError);

console.log(`Server address is ${axiosInstance.defaults.baseURL}`);

// Inject that instance into the services
const DumpsterService = new DumpsterServiceClass(axiosInstance);
const DumpsterTypeService = new DumpsterTypeServiceClass(axiosInstance);
const StoreTypeService = new StoreTypeServiceClass(axiosInstance);
const CategoryService = new CategoryServiceClass(axiosInstance);
const PlaceService = new PlaceServiceClass(axiosInstance);
const CommentService = new CommentServiceClass(axiosInstance);
const ContentService = new ContentServiceClass(axiosInstance);
const PhotoService = new PhotoServiceClass(axiosInstance);
const VisitService = new VisitServiceClass(axiosInstance);
const UserService = new UserServiceClass(axiosInstance);
const ReportService = new ReportServiceClass(axiosInstance);
const RatingService = new RatingServiceClass(axiosInstance);

// and export them
export {
    DumpsterService,
    DumpsterTypeService,
    StoreTypeService,
    CategoryService,
    PlaceService,
    CommentService,
    ContentService,
    PhotoService,
    VisitService,
    UserService,
    ReportService,
    RatingService,
};
