import { AxiosInstance } from "axios";
import Photo, { RawPhoto } from "../models/Photo";
import Constants from "expo-constants";

const typeMap: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
};

const PHOTO_URL =
    Constants.manifest.extra.photoURL || "http://localhost:3001/pic/";

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

    /**
     * Uploads a photo and registers it as a photo of the given dumpster
     * @param dumpsterID
     * @param photoURI
     */
    async addPhoto(dumpsterID: number, photoURI: string): Promise<RawPhoto> {
        console.log("Uploading photo of dumpster", dumpsterID);
        const extension = photoURI.split(".").pop();
        if (!(extension && extension in typeMap))
            throw new Error(`Invalid file extension ${extension}`);

        // First, upload photo
        const formData = new FormData();
        formData.append("userID", "temp");
        formData.append("picture", {
            // @ts-ignore
            uri: photoURI,
            type: typeMap[extension],
            name: photoURI.split("/").pop(),
        });
        const response = await this.axios.post(PHOTO_URL, formData);

        // Then, submit it to the API
        const { data } = await this.axios.post(
            `/dumpsters/${dumpsterID}/photos`,
            {
                url: `${PHOTO_URL}${response.data.filename}`,
                userID: "temp",
            },
        );
        return data;
    }
}
