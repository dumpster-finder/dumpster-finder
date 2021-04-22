import React from "react";
import { Marker } from "react-native-maps";
import Position from "../../models/Position";
const icon = require("../../assets/images/user-marker.png");

/**
 * Marks your position
 *
 * @param position The position the user has set
 * @param onChange A handler for drag end events. Makes the marker draggable if set.
 */
export default function ({
    position,
    onChange,
}: {
    position: Position;
    onChange?: (p: Position) => void;
}) {
    return (
        <Marker
            coordinate={position}
            image={icon}
            draggable={!!onChange}
            onDragEnd={onChange && (e => onChange(e.nativeEvent.coordinate))}
        />
    );
}
