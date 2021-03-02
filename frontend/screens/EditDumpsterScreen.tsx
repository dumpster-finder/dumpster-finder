import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import DumpsterEditor from "../components/DumpsterEditor";
import {addDumpster, currentDumpsterSelector} from "../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import {DumpsterService} from "../services";
import {setCurrentDumpster} from "../redux/slices/dumpsterSlice";
import {resetEditor} from "../redux/slices/editorSlice";
import {useAppDispatch} from "../redux/store";

export default function EditDumpsterScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
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
                <DumpsterEditor mode="edit" dumpster={dumpster} onSave={handleSave} />
            </Layout>
        );
    }

    async function handleSave(dumpster: Omit<Dumpster, "rating">) {
        try {
            // Update the dumpster
            const updatedDumpster = await DumpsterService.updateDumpster(dumpster);
            // Add this dumpster to the list of dumpsters!
            dispatch(addDumpster(updatedDumpster));
            dispatch(setCurrentDumpster(updatedDumpster));
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.pop();
        } catch (e) {
            // TODO Replace with better error handling
            console.error("Could not update this dumpster:", e);
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
