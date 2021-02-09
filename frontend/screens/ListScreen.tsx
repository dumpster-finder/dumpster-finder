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
import {Icon, SearchBar} from "react-native-elements";
import useColorScheme from "../hooks/useColorScheme";

const a: Dumpster = {
    dumpsterID: 1,
    name: "Helens' store",
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

const c: Dumpster = {
    dumpsterID: 1,
    name: "Jons' store",
    position: {latitude: 1, longitude: 2},
    emptyingSchedule: "Today",
    locked: false,
    positiveStoreViewOnDiving: true,
    rating: 4.5,
    cleanliness: 3.5,
    storeType: "Beds",
    dumpsterType: "idk",
};



export default function ListScreen() {
    const colorScheme = useColorScheme();
    const allDumpsters = [a, b, c];

    return (
        <ScrollView style={styles.scrollView}>
            <View style={{
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                alignItems:'center',
                justifyContent: 'center'
            }}>
                <View style={{width: '90%', height:'100%'}} >
                    <SearchBar
                        lightTheme={colorScheme === 'light'}
                        placeholder="Type Here..."
                        value={''}
                    />
                </View>
                <View style={{width: '10%', height:'100%', justifyContent:'center'}} >
                    <Icon name='filter' type="font-awesome"/>
                </View>
            </View>
            {allDumpsters.map((thisDumpster) => <ListCards dumpster={thisDumpster}/>)}
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
