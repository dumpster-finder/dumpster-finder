import * as React from "react";
import {StyleSheet, Switch} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import {Text, View} from "../components/Themed";

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/SettingsScreen.tsx" />
            <View style={styles.horizontalContainer}>
                <Switch value={true} />
                <Text>hgrhguhrwgi</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexGrow: 0
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
