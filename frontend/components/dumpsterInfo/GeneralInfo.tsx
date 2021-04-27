import * as React from "react";
import Dumpster from "../../models/Dumpster";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
    NegativeIcon,
    PositiveIcon,
    TrashIcon,
} from "../basicComponents/Icons";
import { Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { visitsSelector } from "../../redux/slices/configSlice";

export default function GeneralInfo({ dumpster }: { dumpster: Dumpster }) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    const visitWindow = useSelector(visitsSelector);
    return (
        <View style={styles.infoView}>
            <View style={styles.row}>
                <TrashIcon size="small" />
                <Text style={styles.rowText}>
                    {t("emptyingSchedule")}:{" "}
                    {dumpster.emptyingSchedule || t("unknown")}
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
            <View style={styles.row}>
                <Text style={styles.rowText}>
                    {t("visit:part1")} {dumpster.visits}{" "}
                    {dumpster.visits === 1 ? t("visit:time") : t("visit:times")}{" "}
                    {visitWindow === 0
                        ? t("visit:dayText")
                        : visitWindow === 1
                        ? t("visit:daysText")
                        : t("visit:weekText")}
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
