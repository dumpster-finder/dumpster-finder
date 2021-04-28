import { AxiosInstance } from "axios";

export default class RatingService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    /**
     * Rate a dumpster
     *
     * @param dumpsterID ID of the dumpster that is rated
     * @param rating     What to rate the dumpster
     */
    rate(dumpsterID: number, rating: number): Promise<void> {
        console.log(`Rated dumpster ${dumpsterID} ${rating}/5`);
        return this.axios
            .post(`/dumpsters/${dumpsterID}/ratings`, { rating })
            .then(response => response.data);
    }

    updateRating(dumpsterID: number, rating: number): Promise<void> {
        console.log(`Changed rating of dumpster ${dumpsterID} to ${rating}/5`);
        return this.axios
            .put(`/dumpsters/${dumpsterID}/ratings`, { rating }) // TODO I don't quite like this URL but I might leave it be …
            .then(response => response.data);
    }
}
