import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import DumpsterDropdownCard from "../components/DumpsterDropdownCard";
import { useSelector } from "react-redux";
import {
    currentDumpsterSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { RevDumpster } from "../models/Dumpster";
import { useEffect, useState } from "react";
import { DumpsterService } from "../services";
import { useAppDispatch } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";

export default function RevisionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const dumpster = useSelector(currentDumpsterSelector);
    const [dumpsterList, setDumpsterList] = useState<RevDumpster[]>([]);
    useEffect(() => {
        if (dumpster)
            DumpsterService.getRevisions(dumpster.dumpsterID)
                .then(data => setDumpsterList(data))
                .catch(e => console.error("Could not fetch revisions", e));
    }, []);
    if (dumpster === null) {
        return <View>Cry</View>;
    } else {
        return (
            <Layout style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {dumpsterList.map((value, index) => (
                        <DumpsterDropdownCard
                            key={index}
                            text={value.dateUpdated}
                            dumpster={value}
                            onReset={reset}
                        />
                    ))}
                </ScrollView>
            </Layout>
        );
    }
    function reset(newDumpster: RevDumpster) {
        if (dumpster)
            DumpsterService.setRevision(
                newDumpster.dumpsterID,
                newDumpster.revisionID,
            )
                .then(() =>
                    dispatch(
                        setCurrentDumpster({
                            dumpsterID: newDumpster.dumpsterID,
                            name: newDumpster.name,
                            position: newDumpster.position,
                            emptyingSchedule: newDumpster.emptyingSchedule,
                            locked: newDumpster.locked,
                            positiveStoreViewOnDiving:
                                newDumpster.positiveStoreViewOnDiving,
                            cleanliness: newDumpster.cleanliness,
                            rating: dumpster.rating,
                            dumpsterType: newDumpster.dumpsterType,
                            storeType: newDumpster.storeType,
                            categories: newDumpster.categories,
                            info: newDumpster.info,
                        }),
                    ),
                )
                .then(() => navigation.navigate("DetailsScreen"))
                .catch(e => console.error("Could not reset revisions", e));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "auto",
        marginVertical: "15%",
    },
});
