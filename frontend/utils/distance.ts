import Position from "../models/Position";
import Dumpster from "../models/Dumpster";

// Uses the Haversine formula to calculate distance between two points
// TODO: Was this merely copy-paste, or did you do something else with it?
//       → if copy-paste: please credit the original author!
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
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
    return distance;
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
