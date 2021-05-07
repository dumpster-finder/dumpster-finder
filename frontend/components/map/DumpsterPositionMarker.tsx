import React from "react";
import { Marker } from "react-native-maps";
import { DraggableMarkerProps } from "./PositionMarker";
const icon = require("../../assets/images/dumpster-position-marker.png");

/**
 * Marks your position
 *
 * @param position The position the user has set
 * @param onChange A handler for drag end events. Makes the marker draggable if set.
 */
export default function({ position, onChange }: DraggableMarkerProps) {
    return (
        <Marker
            coordinate={position}
            image={icon}
            draggable={!!onChange}
            onDragEnd={onChange && (e => onChange(e.nativeEvent.coordinate))}
        />
    );
}
