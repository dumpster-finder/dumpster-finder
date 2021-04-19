import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import DumpsterListCards from "../components/cards/DumpsterListCards";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch } from "../redux/store";
import {
    allDumpstersSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import SearchHeader from "../components/basicComponents/SearchHeader";
import { Layout } from "@ui-kitten/components";
import { calcOrUseDistance } from "../utils/distance";
import { positionSelector } from "../redux/slices/configSlice";

export default function ListScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const dumpsters = useSelector(allDumpstersSelector);
    const p = useSelector(positionSelector);

    return (
        <Layout style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <SearchHeader
                    onPressPlus={() => {
                        navigation.navigate("AddPositionScreen", {
                            screen: "AddPositionScreen",
                        });
                    }}
                />
                {dumpsters
                    .sort(
                        (a, b) =>
                            calcOrUseDistance(p, a) - calcOrUseDistance(p, b),
                    )
                    .map(thisDumpster => (
                        <DumpsterListCards
                            key={thisDumpster.dumpsterID}
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
        </Layout>
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
