import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ListCards from "../components/ListCards";
import useColorScheme from "../hooks/useColorScheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch } from "../redux/store";
import {
    allDumpstersSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import SearchHeader from "../components/SearchHeader";

export default function ListScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const colorScheme = useColorScheme();
    const dispatch = useAppDispatch();
    const dumpsters = useSelector(allDumpstersSelector);

    return (
        <ScrollView style={styles.scrollView}>
            <SearchHeader
                onPressPlus={() => {
                    navigation.navigate("AddPositionScreen", {
                        screen: "AddPositionScreen",
                    });
                }}
            />
            {dumpsters.map(thisDumpster => (
                <ListCards
                    dumpster={thisDumpster}
                    onPress={() => {
                        dispatch(setCurrentDumpster(thisDumpster));
                        navigation.navigate("DetailsScreen", {
                            screen: "DetailsScreen",
                        });
                    }}
                />
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
