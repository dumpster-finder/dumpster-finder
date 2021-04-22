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
import useToken from "../hooks/useToken";
import Message from "../utils/Message";

export default function RevisionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const dispatch = useAppDispatch();
    const dumpster = useSelector(currentDumpsterSelector);
    const [dumpsterList, setDumpsterList] = useState<RevDumpster[]>([]);
    const { token, onTokenFailure } = useToken();

    useEffect(() => {
        if (dumpster)
            DumpsterService.getRevisions(dumpster.dumpsterID)
                .then(data => setDumpsterList(data))
                .catch(e => Message.error(e, "Could not fetch revisions"));
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
                token,
            )
                .then(() => {
                    dispatch(
                        setCurrentDumpster({
                            ...restDumpster,
                            rating: dumpster.rating,
                        }),
                    );
                    dispatch(
                        addDumpster({
                            ...restDumpster,
                            rating: dumpster.rating,
                        }),
                    );
                    navigation.navigate("DetailsScreen");
                })
                .catch(e => Message.error(e, "Could not reset revisions"));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
