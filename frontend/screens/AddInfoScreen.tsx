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

    async function handleSubmit() {
        if(name != ""){
            let positiveView = null;
            if (positiveStoreViewOnDiving === 0) {
                positiveView = false;
            } else if (positiveStoreViewOnDiving === 2) {
                positiveView = true;
            }
            // (rating is omitted because it is calculated later, idk what the backend will do rn)
            const dumpster: Omit<Dumpster, "dumpsterID" | "rating"> = {
                name,
                position,
                dumpsterType: dumpsterTypes[dumpsterTypeIndex.row],
                storeType: storeTypes[storeTypeIndex.row],
                emptyingSchedule,
                cleanliness,
                positiveStoreViewOnDiving: positiveView,
                locked,
            };

            // Post the dumpster, then fetch & add it to the list of dumpster if that succeeds
            const { data: { dumpsterID } } = await DumpsterService.addDumpster(dumpster);
            // Add this dumpster to the list of dumpsters!
            // TODO or just actually fetch data from the backend, y'know
            dispatch(addDumpster({ ...dumpster, dumpsterID, rating: 0}))
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.dispatch(StackActions.popToTop());
        }else{
            console.log("Does not have name")
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
