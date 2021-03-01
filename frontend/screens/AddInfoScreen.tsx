import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import { editorPositionSelector } from "../redux/slices/editorSlice";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import { StackNavigationProp } from "@react-navigation/stack";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import DumpsterEditor from "../components/DumpsterEditor";

export default function AddInfoScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(editorPositionSelector);

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
