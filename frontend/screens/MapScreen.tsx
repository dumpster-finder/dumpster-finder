import * as React from "react";
import {Button, StyleSheet} from "react-native";

import {Text, View} from "../components/Themed";
import MapView, {Callout, Marker, UrlTile} from "react-native-maps";
import {Icon, SearchBar} from "react-native-elements";
import useColorScheme from "../hooks/useColorScheme";

export default function MapScreen() {
    const colorScheme = useColorScheme();
    return (
        <View style={styles.container}>
            <View
                style={{
                    width: "100%",
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                }}>
                <View
                    style={{
                        width: "10%",
                        height: "100%",
                        justifyContent: "center",
                    }}>
                    <Icon
                        name="plus"
                        type="font-awesome"
                        onPress={() => {
                            console.log("add");
                        }}
                    />
                </View>
                <View style={{width: "80%", height: "100%"}}>
                    <SearchBar
                        lightTheme={colorScheme === "light"}
                        placeholder="Type Here..."
                        value={""}
                    />
                </View>
                <View
                    style={{
                        width: "10%",
                        height: "100%",
                        justifyContent: "center",
                    }}>
                    <Icon
                        name="filter"
                        type="font-awesome"
                        onPress={() => {
                            console.log("filter");
                        }}
                    />
                </View>
            </View>
            <MapView
                provider={null}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{
                    flex: 9,
                    width: '100%',
                }}
                showsPointsOfInterest={false}
                mapPadding={{ top: 0, left: 0, right: 0, bottom: 0}}
            >
                <Marker
                    coordinate={{ latitude : 37.78824 , longitude : -122.4323 }}
                >
                    <Callout>
                        <View>
                            <Text style={styles.title}>Bunnpris</Text>
                            <Text>Groceries</Text>
                            <Button title="More" onPress={() => null}/>
                        </View>
                    </Callout>
                </Marker>
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
        </View>
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
