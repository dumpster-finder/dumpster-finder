import * as React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";
import ListCards from "../components/ListCards";
import { Icon, SearchBar } from "react-native-elements";
import useColorScheme from "../hooks/useColorScheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch } from "../redux/store";
import { setCurrentDumpster } from "../redux/slices/dumpsterSlice";
import { testDumpsters } from "../constants/TestData";

export default function ListScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const colorScheme = useColorScheme();
    const dispatch = useAppDispatch();

    return (
        <ScrollView style={styles.scrollView}>
            <View
                style={{
                    width: "100%",
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
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
                            navigation.navigate("AddPositionScreen", {
                                screen: "AddPositionScreen",
                            });
                        }}
                    />
                </View>
                <View style={{ width: "80%", height: "100%" }}>
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

            {testDumpsters.map(thisDumpster => (
                <TouchableOpacity
                    key={thisDumpster.dumpsterID}
                    onPress={() => {
                        dispatch(setCurrentDumpster(thisDumpster));
                        navigation.navigate("DetailsScreen", {
                            screen: "DetailsScreen",
                        });
                    }}>
                    <ListCards dumpster={thisDumpster} />
                </TouchableOpacity>
            ))}
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
