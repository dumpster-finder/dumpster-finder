import * as React from "react";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
    FlagButtonIcon,
    PendingButtonIcon,
} from "../components/basicComponents/Icons";
import { useTranslation } from "react-i18next";
import { ReportService } from "../services";
import Message from "../utils/Message";

export default function FlagScreen({
    navigation,
}: {
    navigation: NavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("report");
    const dumpster = useSelector(currentDumpsterSelector);
    const [fetchFlags, setFetchFlags] = useState(false);
    const [hasFlagged, setHasFlagged] = useState(false);
    const [justFlagged, setJustFlagged] = useState(false);
    const [reason, setReason] = useState("");
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (dumpster) {
            ReportService.getOne(dumpster.dumpsterID)
                .then(_ => {
                    setHasFlagged(true);
                    setFetchFlags(true);
                })
                .catch(e => {
                    if (e.response && e.response.data.statusCode === 404)
                        setFetchFlags(true);
                    else Message.error(e, "Could not fetch your report");
                });
        }
    }, [dumpster]);
    return (
        <Layout style={styles.container}>
            {!hasFlagged ? (
                <View style={styles.view}>
                    <View style={styles.info}>
                        <Text>{t("text")}</Text>
                    </View>
                    <Input
                        style={styles.input}
                        placeholder={t("reason.placeholder")}
                        label={t("reason.label")}
                        textStyle={{ minHeight: 64 }}
                        onChangeText={change => setReason(change)}
                        multiline={true}
                    />
                    <Button
                        status={"danger"}
                        size={"giant"}
                        disabled={pending || !fetchFlags}
                        accessoryLeft={
                            pending ? PendingButtonIcon : FlagButtonIcon
                        }
                        onPress={onFlag}
                    >
                        {t("report")}
                    </Button>
                </View>
            ) : (
                <View style={styles.view}>
                    <View style={{ padding: 5 }}>
                        {justFlagged ? (
                            <Text category={"h4"}>{t("justReport")}</Text>
                        ) : (
                            <Text category={"h4"}>{t("alreadyReport")}</Text>
                        )}
                    </View>
                    <Button
                        style={{ marginVertical: 15, minWidth: "40%" }}
                        status={"basic"}
                        onPress={() => navigation.goBack()}
                        size={"giant"}
                    >
                        {t("back")}
                    </Button>
                </View>
            )}
        </Layout>
    );

    async function onFlag() {
        setPending(true);
        if (dumpster) {
            try {
                await ReportService.addOne(dumpster.dumpsterID, reason);
                setHasFlagged(true);
                setJustFlagged(true);
            } catch (e) {
                Message.error(e, "Could not report dumpster");
                setPending(false);
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
    },
    view: {
        width: "95%",
        alignItems: "center",
    },
    info: {
        marginVertical: 10,
    },
    input: {
        marginVertical: 10,
    },
});
