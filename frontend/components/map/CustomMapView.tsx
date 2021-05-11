import MapView from "react-native-maps";
import * as React from "react";
import { LegacyRef, PropsWithChildren } from "react";
import MapTileSet from "./MapTileSet";
import { Platform, StyleProp, ViewStyle } from "react-native";
import Position from "../../models/Position";
import darkMapStyle from "./styles/dark.json";
import lightMapStyle from "./styles/light.json";
import { useSelector } from "react-redux";
import { darkModeSelector } from "../../redux/slices/configSlice";

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
    const darkMode = useSelector(darkModeSelector);
    const mapStyle = darkMode ? darkMapStyle : lightMapStyle;
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
            // Add a custom map style for Google Maps *only if* this is Android
            customMapStyle={Platform.OS === "android" ? mapStyle : undefined}
        >
            {children}
            <MapTileSet />
        </MapView>
    );
}
