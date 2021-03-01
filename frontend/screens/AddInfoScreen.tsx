import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import {
    editorDumpsterSelector,
    editorPositionSelector,
    resetEditor,
} from "../redux/slices/editorSlice";
import { addDumpster } from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import { StackNavigationProp } from "@react-navigation/stack";
import DumpsterEditor from "../components/DumpsterEditor";
import { DumpsterService } from "../services";
import { StackActions } from "@react-navigation/native";

export default function AddInfoScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const dumpster = useSelector(editorDumpsterSelector);

    if (dumpster === null) {
        return (
            <View style={styles.container}>
                <Text>CRY</Text>
            </View>
        );
    } else {
        return (
            <Layout style={styles.container}>
                <DumpsterEditor dumpster={dumpster} onSave={handleSave} />
            </Layout>
        );
    }

    async function handleSave(dumpster: Omit<Dumpster, "rating">) {
        try {
            // Post the dumpster, receive the actual dumpster object from the backend
            const postedDumpster = await DumpsterService.addDumpster(dumpster);
            // Add this dumpster to the list of dumpsters!
            dispatch(addDumpster(postedDumpster));
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.dispatch(StackActions.popToTop());
        } catch (e) {
            // TODO Replace with better error handling
            console.error("Could not add this dumpster:", e);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
