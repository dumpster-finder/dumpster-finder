import Position from "../models/Position";
import Dumpster from "../models/Dumpster";

/**
 * Uses the Haversine formula to calculate distance between two points
 * Based on https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
 */
export function distance(
    currentPosition: Position,
    dumpsterPosition: Position,
) {
    const earthRadiusKm = 6371;

    const dLat =
        ((currentPosition.latitude - dumpsterPosition.latitude) * Math.PI) /
        180;
    const dLon =
        ((currentPosition.longitude - dumpsterPosition.longitude) * Math.PI) /
        180;

    const lat1 = (currentPosition.latitude * Math.PI) / 180;
    const lat2 = (dumpsterPosition.latitude * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Use the dumpster's distance value (if it is set),
 * or calculate it yourself
 *
 * @param currentPosition
 * @param dumpster
 */
export function calcOrUseDistance(
    currentPosition: Position,
    dumpster: Dumpster,
) {
    return dumpster.distance
        ? dumpster.distance / 1000
        : distance(currentPosition, dumpster.position);
}
