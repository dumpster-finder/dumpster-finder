import React from "react";
import { Callout, Marker } from "react-native-maps";
import { Text } from "react-native-elements";
import Dumpster from "../models/Dumpster";
import { View } from "react-native";

/**
 * Displays a dumpster as a marker on a map
 * Used in the map view
 *
 * @param dumpster The dumpster to display
 * @param onPress  What should happen when the callout/marker is tapped
 */
export default function ({
    dumpster: { name, storeType, dumpsterType, position },
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    return (
        <Marker coordinate={position}>
            <Callout onPress={onPress}>
                <View>
                    <Text h4>{name}</Text>
                    <Text>{storeType}</Text>
                    <Text>{dumpsterType}</Text>
                </View>
            </Callout>
        </Marker>
    );
}
