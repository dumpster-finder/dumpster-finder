import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import DumpsterEditor from "../components/compoundComponents/DumpsterEditor";
import {
    addDumpster,
    currentDumpsterSelector,
} from "../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { DumpsterService } from "../services";
import { setCurrentDumpster } from "../redux/slices/dumpsterSlice";
import { resetEditor } from "../redux/slices/editorSlice";
import { useAppDispatch } from "../redux/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditDumpsterScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const dispatch = useAppDispatch();
    const dumpster = useSelector(currentDumpsterSelector);
    const [pending, setPending] = useState(false);

    if (dumpster === null) {
        return (
            <Layout style={styles.container}>
                <Text category="h1">{t("somethingWrong")}</Text>
            </Layout>
        );
    } else {
        return (
            <Layout style={styles.container}>
                <DumpsterEditor
                    mode="edit"
                    dumpster={dumpster}
                    onSave={handleSave}
                    pending={pending}
                />
            </Layout>
        );
    }

    async function handleSave(dumpster: Omit<Dumpster, "rating">) {
        try {
            setPending(true);
            // Update the dumpster
            const updatedDumpster = await DumpsterService.updateDumpster(
                dumpster,
            );
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
            setPending(false);
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
