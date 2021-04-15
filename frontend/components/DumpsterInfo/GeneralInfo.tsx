import * as React from "react";
import Dumpster from "../../models/Dumpster";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { NegativeIcon, PositiveIcon, TrashIcon } from "../Icons";
import { Text } from "@ui-kitten/components";

export default function GeneralInfo({ dumpster }: { dumpster: Dumpster }) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    return (
        <View style={styles.infoView}>
            <View style={styles.row}>
                <TrashIcon size="small" />
                <Text style={styles.rowText}>
                    {t("emptyingSchedule")}: {dumpster.emptyingSchedule}
                </Text>
            </View>
            {/* STORE VIEW */}
            <View style={styles.row}>
                {dumpster.positiveStoreViewOnDiving ? (
                    <PositiveIcon size="small" />
                ) : dumpster.positiveStoreViewOnDiving === null ? (
                    <PositiveIcon size="small" /> // TODO decide what icon to have here...
                ) : (
                    <NegativeIcon size={"small"} />
                )}
                <Text style={styles.rowText}>
                    {t("view")}
                    {": "}
                    {dumpster.positiveStoreViewOnDiving ? (
                        <Text>{t("positive")}</Text>
                    ) : dumpster.positiveStoreViewOnDiving === null ? (
                        <Text>{t("neutral")}</Text>
                    ) : (
                        <Text>{t("negative")}</Text>
                    )}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowText: {
        marginLeft: 3,
    },
    infoView: {
        marginVertical: 5,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 2,
    },
});
