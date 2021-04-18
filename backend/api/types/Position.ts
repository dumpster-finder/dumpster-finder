export default interface Position {
    latitude: number;
    longitude: number;
}

export interface PositionParams {
    latitude: number;
    longitude: number;
    radius: number;
    dateInterval: string;
}

export interface GeoJSONPoint {
    type: "Point";
    coordinates: [number, number];
}
