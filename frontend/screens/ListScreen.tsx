import * as React from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import {Text, View} from "../components/Themed";
import ListCards from "../components/ListCards";
import Dumpster from "../models/Dumpster";

const a: Dumpster = {
    dumpsterID: 1,
    name: "My store",
    position: {latitude: 1, longitude: 2},
    emptyingSchedule: "Monday",
    locked: true,
    positiveStoreViewOnDiving: false,
    rating: 4.5,
    cleanliness: 3.5,
    storeType: "Food",
    dumpsterType: "idk",
};

const b: Dumpster = {
    dumpsterID: 1,
    name: "Tores' store",
    position: {latitude: 1, longitude: 2},
    emptyingSchedule: "Today",
    locked: false,
    positiveStoreViewOnDiving: true,
    rating: 2.5,
    cleanliness: 1.5,
    storeType: "Electronics",
    dumpsterType: "idk",
};

export default function ListScreen() {
    return (
        <ScrollView style={styles.scrollView}>
            <ListCards dumpster={a}/>
            <ListCards dumpster={b}/>
            <ListCards dumpster={a}/>
            <ListCards dumpster={b}/>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/ListScreen.tsx" />
        </ScrollView>
    );
}

// jesus, dette kan trekkes ut i noe eget, kanskje
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
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
