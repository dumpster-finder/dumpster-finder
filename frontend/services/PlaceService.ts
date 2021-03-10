import { AxiosInstance } from "axios";
import Place from "../models/Place";

interface APIProperties {
    name: string;
    city: string;
    country: string;
    state: string;
}

interface GeoJSONPoint {
    coordinates: [number, number];
    type: "Point";
}

interface APIType {
    properties: APIProperties;
    geometry: GeoJSONPoint;
}

export default class DumpsterTypeService {
    readonly axios;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    search(query: string): Promise<Place[]> {
        return this.axios
            .get(`https://photon.komoot.io/api/?q=${query}`)
            .then(({ data: { features } }: { data: { features: APIType[] } }) =>
                features.map(
                    ({
                        properties: { name, city, state, country },
                        geometry: {
                            coordinates: [longitude, latitude],
                        },
                    }) =>
                        new Place({
                            name,
                            city,
                            state,
                            country,
                            position: { latitude, longitude },
                        }),
                ),
            );
    }
}
