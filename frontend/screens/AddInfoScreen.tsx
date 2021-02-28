import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Layout,
    Input,
    IndexPath,
    Select,
    SelectItem,
    Text,
} from "@ui-kitten/components";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import {
    editorPositionSelector,
    resetEditor,
} from "../redux/slices/editorSlice";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";
import {
    CleanIcon,
    FadedCleanIcon,
    LockIcon,
    PositiveIcon,
    TrashIcon,
} from "../components/Icons";
import { DumpsterService } from "../services";
import Rating from "../components/Rating";
import ButtonGroupDisplay from "../components/ButtonGroupDisplay";
import {currentDumpsterSelector} from "../redux/slices/dumpsterSlice";
import DumpsterEditor from "../components/DumpsterEditor";

export default function AddInfoScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(editorPositionSelector);
    const dumpsterTypes = ["Metal", "Compressor", "Plastic"];
    const storeTypes = ["Food", "Electronics"];


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
                <DumpsterEditor dumpster={dumpster} onSave={save}/>
            </Layout>
        );
    }

    function save(dumpster:Dumpster){

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
