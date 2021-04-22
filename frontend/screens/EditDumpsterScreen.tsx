import * as React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { UpdatedDumpster } from "../models/Dumpster";
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
import useToken from "../hooks/useToken";
import Message from "../utils/Message";

export default function EditDumpsterScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const dispatch = useAppDispatch();
    const actualDumpster = useSelector(currentDumpsterSelector);
    const [pending, setPending] = useState(false);
    const { token, onTokenFailure } = useToken();

    if (actualDumpster === null) {
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
                    dumpster={actualDumpster}
                    onSave={handleSave}
                    pending={pending}
                />
            </Layout>
        );
    }

    async function handleSave(dumpster: UpdatedDumpster) {
        if (!actualDumpster) return; // there was no dumpster to edit in the first place
        try {
            setPending(true);
            // Update the dumpster
            const updatedDumpster = await DumpsterService.updateDumpster(
                {
                    ...dumpster,
                    rating: actualDumpster.rating,
                    visits: actualDumpster.visits,
                },
                token,
            );
            // Add this dumpster to the list of dumpsters!
            dispatch(addDumpster(updatedDumpster));
            dispatch(setCurrentDumpster(updatedDumpster));
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.pop();
        } catch (e) {
            Message.error(e, "Could not update this dumpster");
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
