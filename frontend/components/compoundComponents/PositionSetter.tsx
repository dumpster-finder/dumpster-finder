import * as React from "react";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Position from "../../models/Position";
import { StyleSheet } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

export default function({
    initialPosition,
    onSubmit,
}: {
    initialPosition: Position;
    onSubmit: (position: Position) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("position");
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
                onPress={e => setPosition(e.nativeEvent.coordinate)}
            >
                <Marker
                    draggable
                    coordinate={position}
                    onDragEnd={e => setPosition(e.nativeEvent.coordinate)}
                />
            </MapView>
            <Layout style={styles.positionBox}>
                <Text category="h4">
                    {"("}
                    {position.latitude.toFixed(5)}
                    {", "}
                    {position.longitude.toFixed(5)}
                    {")"}
                </Text>
            </Layout>
            <Button onPress={() => onSubmit(position)}>{t("save")}</Button>
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
        fontWeight: "200",
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        width: "100%",
    },
});
