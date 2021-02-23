import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";
import useColorScheme from "../hooks/useColorScheme";
import { StackNavigationProp } from "@react-navigation/stack";
import DumpsterMarker from "../components/DumpsterMarker";
import { useAppDispatch } from "../redux/store";
import {allDumpstersSelector, setCurrentDumpster} from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import { positionSelector, setPosition } from "../redux/slices/configSlice";
import { useEffect } from "react";
//import SearchHeader from "../components/SearchHeader";
import {Layout} from "@ui-kitten/components";

export default function MapScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(positionSelector);
    const dumpsters = useSelector(allDumpstersSelector);

    useEffect(() => {
        // this is here for testing purposes
        // (since the initialState originally had position (0, 0))
        dispatch(
            setPosition({
                latitude: 63.41775,
                longitude: 10.404344,
            }),
        );
    }, []);

    return (
        <Layout style={styles.container}>

            <MapView
                provider={null}
                initialRegion={{
                    ...position, // Expands to latitude and longitude
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{
                    flex: 9,
                    width: "100%",
                }}
                showsPointsOfInterest={false}
                mapPadding={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}>
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
                <UrlTile
                    /**
                     * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
                     * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
                     */
                    urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    /**
                     * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
                     * MKTileOverlay. iOS only.
                     */
                    maximumZ={19}
                    /**
                     * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
                     * to be used. Its default value is false.
                     */
                    flipY={false}
                />
            </MapView>
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
});
