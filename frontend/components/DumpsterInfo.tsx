import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "@ui-kitten/components";
import {
    BrushIcon,
    LockIcon,
    NegativeIcon,
    OpenLockIcon,
    PositiveIcon,
    StarIcon,
    TrashIcon,
} from "./Icons";
import Dumpster from "../models/Dumpster";
import { useTranslation } from "react-i18next";

export default function DumpsterInfo({ dumpster }: { dumpster: Dumpster }) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <View style={styles.box}>
                {typeof dumpster.rating === "undefined" ? null : (
                    <View style={styles.boxRow}>
                        <StarIcon size="small" />
                        <Text style={styles.infoText}>
                            {t("rating")} {dumpster.rating.toFixed(1)}
                        </Text>
                    </View>
                )}

                <View style={styles.boxRow}>
                    <BrushIcon size="small" />
                    <Text style={styles.infoText}>
                        {t("cleanliness")} {dumpster.cleanliness}
                    </Text>
                </View>
                <View style={styles.boxRow}>
                    {dumpster.locked ? (
                        <>
                            <LockIcon size="small" />
                            <Text style={styles.infoText}>{t("locked")}</Text>
                        </>
                    ) : (
                        <>
                            <OpenLockIcon size="small" />
                            <Text style={styles.infoText}>{t("unlocked")}</Text>
                        </>
                    )}
                </View>
            </View>
            <View style={styles.infoRow}>
                <TrashIcon size="small" />
                <Text style={styles.infoText}>
                    {t("emptyingSchedule")} {dumpster.emptyingSchedule}
                </Text>
            </View>
            <View style={styles.infoRow}>
                {dumpster.positiveStoreViewOnDiving ? (
                    <PositiveIcon size="small" />
                ) : dumpster.positiveStoreViewOnDiving === null ? (
                    <PositiveIcon size="small" /> // TODO decide what icon to have here...
                ) : (
                    <NegativeIcon size={"small"} />
                )}
                <Text style={styles.infoText}>
                    {t("view")}{" "}
                    {dumpster.positiveStoreViewOnDiving ? (
                        <Text>{t("positive")}</Text>
                    ) : dumpster.positiveStoreViewOnDiving === null ? (
                        <Text>{t("neutral")}</Text>
                    ) : (
                        <Text>{t("negative")}</Text>
                    )}
                </Text>
            </View>
            <View style={styles.infoRow}>
                <Text>
                    {t("dumpsterType")} {dumpster.dumpsterType}
                </Text>
            </View>
            <View style={styles.infoBox}>
                <Divider />
                <Text style={{ paddingVertical: 2 }}>{dumpster.info}</Text>
                <Divider />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoText: {
        paddingLeft: 3,
    },
    infoView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    infoRow: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
    },
    box: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: 5,
    },
    boxRow: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    infoBox: {
        paddingVertical: 5,
    },
});
