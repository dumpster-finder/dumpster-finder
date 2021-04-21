import MapView, { Region } from "react-native-maps";
import * as React from "react";
import { LegacyRef, PropsWithChildren } from "react";
import MapTileSet from "./MapTileSet";
import { StyleProp, ViewStyle } from "react-native";

interface MapProps {
    initialRegion: Region;
    region: Region;
    onRegionChangeComplete?: (region: Region) => void;
    setRef?: LegacyRef<MapView> | undefined;
    style: StyleProp<ViewStyle>;
}

export default function CustomMapView({
    children,
    initialRegion,
    region,
    onRegionChangeComplete,
    style,
    setRef,
}: PropsWithChildren<MapProps>) {
    return (
        <MapView
            provider={null}
            ref={setRef}
            initialRegion={initialRegion}
            region={region}
            onRegionChangeComplete={onRegionChangeComplete}
            style={style}
            showsPointsOfInterest={false}
            mapPadding={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            {children}
            <MapTileSet />
        </MapView>
    );
}
