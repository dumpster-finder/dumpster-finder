import { AxiosInstance } from "axios";
import Photo, { RawPhoto } from "../models/Photo";

export default class PhotoService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Fetches photos
     *
     * @param dumpsterID ID of the dumpster to fetch photos for
     */
    getPhotos(dumpsterID: number): Promise<Photo[]> {
        console.log("Fetched photos for dumpster", dumpsterID);
        return this.axios
            .get(`/dumpsters/${dumpsterID}/photos`)
            .then(response => response.data.map((p: RawPhoto) => new Photo(p)));
    }

    addPhoto(dumpsterID: number, photo: File) {
        // TODO
    }
}
