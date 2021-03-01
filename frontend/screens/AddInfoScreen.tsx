import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import {
    editorPositionSelector,
    resetEditor,
} from "../redux/slices/editorSlice";
import { addDumpster } from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import { StackNavigationProp } from "@react-navigation/stack";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import DumpsterEditor from "../components/DumpsterEditor";
import {DumpsterService} from "../services";

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

    async function handleSubmit() {
        /*

            // Post the dumpster, then fetch & add it to the list of dumpster if that succeeds
            const { data: { dumpsterID } } = await DumpsterService.addDumpster(dumpster);
            // Add this dumpster to the list of dumpsters!
            // TODO or just actually fetch data from the backend, y'know
            dispatch(addDumpster({ ...dumpster, dumpsterID, rating: 0}))
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.dispatch(StackActions.popToTop());


         */

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
