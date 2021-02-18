import * as React from "react";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Position from "../models/Position";
import { Button, Text } from "react-native-elements";
import { View } from "./Themed";
import { StyleSheet } from "react-native";

export default function ({
    initialPosition,
    onSubmit,
}: {
    initialPosition: Position;
    onSubmit: (position: Position) => void;
}) {
    const [position, setPosition] = useState(initialPosition);

    return (
        <>
            <MapView
                provider={null}
                initialRegion={{
                    ...position, // Expands to latitude and longitude
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
                showsPointsOfInterest={false}
                onPress={e => setPosition(e.nativeEvent.coordinate)}>
                <Marker
                    draggable
                    coordinate={position}
                    onDragEnd={e => setPosition(e.nativeEvent.coordinate)}
                />
            </MapView>
            <View style={styles.positionBox}>
                <Text style={styles.text}>
                    {"("}{position.latitude.toFixed(5)}{", "}
                    {position.longitude.toFixed(5)}{")"}
                </Text>
            </View>
            <Button
                onPress={() => onSubmit(position)}
                title="Set position"
            />
        </>
    );
}

const styles = StyleSheet.create({
    positionBox: {
        padding: 15,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: "200"
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        width: "100%",
    }
});
