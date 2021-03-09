import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import DumpsterDropdownCard from "../components/DumpsterDropdownCard";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import Dumpster from "../models/Dumpster";

import { testRevision } from "../constants/TestData";

export default function RevisionScreen() {
    const dumpster = useSelector(currentDumpsterSelector);
    const dates = ["02/11/2020", "07/05/2019", "15/12/2018"];

    if (dumpster === null) {
        return <View>Cry</View>;
    } else {
        return (
            <Layout style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {testRevision.map((value, index) => (
                        <DumpsterDropdownCard
                            text={dates[index]}
                            dumpster={value}
                            onReset={reset}
                        />
                    ))}
                </ScrollView>
            </Layout>
        );
    }
    function reset(dumpster: Dumpster) {
        console.log(dumpster);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "auto",
        marginVertical: "15%",
    },
});
