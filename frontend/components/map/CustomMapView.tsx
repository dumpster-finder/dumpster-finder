import MapView, { Region } from "react-native-maps";
import * as React from "react";
import { LegacyRef, PropsWithChildren } from "react";
import MapTileSet from "./MapTileSet";
import { StyleProp, ViewStyle } from "react-native";
import Position from "../../models/Position";

interface MapProps {
    initialPosition: Position;
    setRef?: LegacyRef<MapView> | undefined;
    onPress?: (p: Position) => void;
    style: StyleProp<ViewStyle>;
}

export default function CustomMapView({
    children,
    initialPosition,
    style,
    setRef,
    onPress,
}: PropsWithChildren<MapProps>) {
    return (
        <MapView
            provider={null}
            ref={setRef}
            initialRegion={{
                ...initialPosition, // Expands to latitude and longitude
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={style}
            showsPointsOfInterest={false}
            mapPadding={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
            onPress={onPress && (e => onPress(e.nativeEvent.coordinate))}
        >
            {children}
            <MapTileSet />
        </MapView>
    );
}
