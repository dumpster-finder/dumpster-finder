import * as React from "react";
import {Button, Slider, StyleSheet, TextInput} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import {Text, View} from "../components/Themed";
import MapView, {Callout, Marker, UrlTile} from "react-native-maps";

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <MapView
                provider={null}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{
                    width: 300,
                    height: 400,
                }}>
                <Marker
                    coordinate={{ latitude : 37.78824 , longitude : -122.4323 }}
                >
                    <Callout>
                        <View>
                            <Text style={styles.title}>Test?</Text>
                            <Text>Is this a test?</Text>
                            <Slider value={0.3} />
                            <Button title="delet" onPress={() => null}/>
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
