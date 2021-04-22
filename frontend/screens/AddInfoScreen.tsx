import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import {
    editorDumpsterSelector,
    resetEditor,
} from "../redux/slices/editorSlice";
import { addDumpster } from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import { UpdatedDumpster } from "../models/Dumpster";
import { StackNavigationProp } from "@react-navigation/stack";
import DumpsterEditor from "../components/compoundComponents/DumpsterEditor";
import { DumpsterService } from "../services";
import { StackActions } from "@react-navigation/native";
import useToken from "../hooks/useToken";
import Message from "../utils/Message";

export default function AddInfoScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const dumpster = useSelector(editorDumpsterSelector);
    const [pending, setPending] = useState(false);
    const { token, onTokenFailure } = useToken();

    if (dumpster === null) {
        return (
            <View style={styles.container}>
                <Text>CRY</Text>
            </View>
        );
    } else {
        return (
            <Layout style={styles.container}>
                <DumpsterEditor
                    mode="create"
                    dumpster={dumpster}
                    onSave={handleSave}
                    pending={pending}
                />
            </Layout>
        );
    }

    async function handleSave(dumpster: UpdatedDumpster) {
        try {
            // Strip the dumpster of ID
            const { dumpsterID, ...restDumpster } = dumpster;
            // Post the dumpster, receive the actual dumpster object from the backend
            setPending(true);
            const postedDumpster = await DumpsterService.addDumpster(
                restDumpster,
                token,
            );
            // Add this dumpster to the list of dumpsters!
            dispatch(addDumpster(postedDumpster));
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.dispatch(StackActions.popToTop());
        } catch (e) {
            Message.error(e, "Could not add this dumpster");
            setPending(false);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
