import React from "react";
import { Marker } from "react-native-maps";
import Position from "../../models/Position";
const icon = require("../../assets/images/user-marker.png");

/**
 * Marks your position
 *
 * @param position The position the user has set
 */
export default function ({ position }: { position: Position }) {
    return (
        <Marker
            coordinate={position}
            image={icon}
            style={{ backgroundColor: "blue" }}
        />
    );
}
