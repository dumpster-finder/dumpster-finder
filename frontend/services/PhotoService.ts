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
     * Fetches cover photo
     *
     * @param dumpsterID ID of the dumpster to fetch photos for
     */
    getCoverPhoto(dumpsterID: number): Promise<RawPhoto> {
        console.log("Fetched cover photo for dumpster", dumpsterID);
        return this.axios
            .get(`/dumpsters/${dumpsterID}/photos/cover`)
            .then(response => response.data); // no need to go through photo class since date ain't needed
    }

    /**
     * Uploads a photo and registers it as a photo of the given dumpster
     * @param dumpsterID The dumpster's ID
     * @param photoURI   URI to the photo (gotten from some image roll API)
     * @param userID     The user's ID
     * @param userName   The user's user name (unique key thing)
     */
    async addPhoto(
        dumpsterID: number,
        photoURI: string,
        userID: number,
        userName: string,
    ): Promise<RawPhoto> {
        console.log("Uploading photo of dumpster", dumpsterID);
        const extension = photoURI.split(".").pop();
        if (!(extension && extension in typeMap))
            throw new Error(`Invalid file extension ${extension}`);

        // First, upload photo
        const formData = new FormData();
        formData.append("userID", userID.toString());
        formData.append("userName", userName);
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
            },
        );
        return data;
    }
}
