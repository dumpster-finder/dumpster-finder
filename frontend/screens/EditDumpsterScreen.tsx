import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import DumpsterEditor from "../components/DumpsterEditor";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";

export default function EditDumpsterScreen() {
    const dumpster = useSelector(currentDumpsterSelector);
    if (dumpster === null) {
        return (
            <View style={styles.container}>
                <Text>CRY</Text>
            </View>
        );
    } else {
        return (
            <Layout style={styles.container}>
                <DumpsterEditor dumpster={dumpster} onSave={save} />
            </Layout>
        );
    }

    function save(dumpster: Dumpster) {}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
