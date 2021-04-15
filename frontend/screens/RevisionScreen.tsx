import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import DumpsterRevisionCard from "../components/cards/DumpsterRevisionCard";
import { useSelector } from "react-redux";
import {
    addDumpster,
    currentDumpsterSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { RevDumpster } from "../models/Dumpster";
import { useEffect, useState } from "react";
import { DumpsterService } from "../services";
import { useAppDispatch } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatDate } from "../utils/date";
import { useTranslation } from "react-i18next";

export default function RevisionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
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
        return (
            <Layout style={styles.container}>
                <Text category="h1">{t("somethingWrong")}</Text>
            </Layout>
        );
    } else {
        return (
            <Layout style={styles.container}>
                <ScrollView>
                    {dumpsterList.map((value, index) => (
                        <DumpsterRevisionCard
                            key={index}
                            text={formatDate(new Date(value.dateUpdated))}
                            dumpster={value}
                            onReset={reset}
                        />
                    ))}
                </ScrollView>
            </Layout>
        );
    }
    function reset(newDumpster: RevDumpster) {
        const { dateUpdated, isActive, ...restDumpster } = newDumpster;
        if (dumpster)
            DumpsterService.setRevision(
                newDumpster.dumpsterID,
                newDumpster.revisionID,
            )
                .then(() =>
                    dispatch(
                        setCurrentDumpster({
                            ...restDumpster,
                            rating: dumpster.rating,
                        }),
                    ),
                )
                .then(() =>
                    dispatch(
                        addDumpster({
                            ...restDumpster,
                            rating: dumpster.rating,
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
});
