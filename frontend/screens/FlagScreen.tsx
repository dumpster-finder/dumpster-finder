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

export default function FlagScreen({
    navigation,
}: {
    navigation: NavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("report");
    const dumpster = useSelector(currentDumpsterSelector);
    const [hasFlagged, setHasFlagged] = useState(false);
    const [justFlagged, setJustFlagged] = useState(false);
    const [reason, setReason] = useState("");
    const [pending, setPending] = useState(false);
    const myUserID = "temp1";
    useEffect(() => {
        if (dumpster) {
            ReportService.getAll(dumpster.dumpsterID)
                .then(data =>
                    data.map(data => {
                        data.userID === myUserID ? setHasFlagged(true) : null;
                    }),
                )
                .catch(e => console.error("Could not fetch comments", e));
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
                        placeholder={t("reason")}
                        label={t("reason")}
                        textStyle={{ minHeight: 64 }}
                        onChangeText={change => setReason(change)}
                        multiline={true}
                    />
                    <Button
                        status={"danger"}
                        size={"giant"}
                        disabled={pending}
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
                        onPress={() => navigation.navigate("DetailsScreen")}
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
        // TODO reason get registered as empty string. Not null
        if (dumpster) {
            await ReportService.addOne(dumpster.dumpsterID, myUserID, reason)
                .then(() => setJustFlagged(true))
                .then(() => setHasFlagged(true))
                .then(response => console.log(response));
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
