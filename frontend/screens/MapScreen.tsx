import * as React from "react";
import { StyleSheet } from "react-native";
import MapView, { Region, UrlTile } from "react-native-maps";
import { StackNavigationProp } from "@react-navigation/stack";
import DumpsterMarker from "../components/map/DumpsterMarker";
import { useAppDispatch } from "../redux/store";
import {
    allDumpstersSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import {
    firstTimeSelector,
    positionSelector,
} from "../redux/slices/configSlice";
import { useEffect, useState } from "react";
import SearchHeader from "../components/basicComponents/SearchHeader";
import { Layout } from "@ui-kitten/components";
import PositionMarker from "../components/map/PositionMarker";
import MapTileSet from "../components/map/MapTileSet";
import CustomMapView from "../components/map/CustomMapView";

export default function MapScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(positionSelector);
    const firstTime = useSelector(firstTimeSelector);
    const [region, setRegion] = useState<Region>({
        ...position,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const dumpsters = useSelector(allDumpstersSelector);

    useEffect(() => {
        if (!firstTime) setRegion({ ...region, ...position });
    }, [position]);

    return (
        <Layout style={styles.container}>
            <SearchHeader
                onPressPlus={() => {
                    navigation.navigate("AddPositionScreen", {
                        screen: "AddPositionScreen",
                    });
                }}
            />
            <CustomMapView
                initialRegion={{
                    ...position, // Expands to latitude and longitude
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={region}
                onRegionChangeComplete={
                    r =>
                        firstTime ||
                        setRegion(r) /* the check prevents looping */
                }
                style={styles.map}
            >
                <PositionMarker position={position} />
                {dumpsters.map(dumpster => (
                    <DumpsterMarker
                        key={dumpster.dumpsterID}
                        dumpster={dumpster}
                        onPress={() => {
                            // TODO: Discuss what we are to do here.
                            //       This sets the dumpster of the details view
                            //       in the list tab as well as the map tab!
                            dispatch(setCurrentDumpster(dumpster));
                            navigation.navigate("DetailsScreen");
                        }}
                    />
                ))}
            </CustomMapView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    map: {
        flex: 9,
        width: "100%",
    },
});
