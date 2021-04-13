import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
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
        <View style={styles.infoView}>
            {/* CATEGORIES */}
            <Text style={{ alignSelf: "center" }}>{t("categories")}</Text>
            <View style={styles.tagRow}>
                {dumpster.categories.map(category => (
                    <Layout level="3" key={category} style={styles.tagBox}>
                        <Text>{t(`categories:${category}`)}</Text>
                    </Layout>
                ))}
            </View>

            {/* EMPTYING SCHEDULE */}
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

            {/* RATING, CLEANLINESS, OPENNESS */}
            <Layout level="2" style={styles.box}>
                {dumpster.rating && (
                    <View style={styles.boxRow}>
                        <StarIcon size="small" />
                        <Text style={styles.rowText}>
                            {t("rating")}: {dumpster.rating.toFixed(1)}
                        </Text>
                    </View>
                )}

                <View style={styles.boxRow}>
                    <BrushIcon size="small" />
                    <Text style={styles.rowText}>
                        {t("cleanliness")}: {dumpster.cleanliness}
                    </Text>
                </View>
                <View style={styles.boxRow}>
                    {dumpster.locked ? (
                        <>
                            <LockIcon size="small" />
                            <Text style={styles.rowText}>{t("locked")}</Text>
                        </>
                    ) : (
                        <>
                            <OpenLockIcon size="small" />
                            <Text style={styles.rowText}>{t("unlocked")}</Text>
                        </>
                    )}
                </View>
            </Layout>
            <Layout level="2" style={styles.infoBox}>
                <Text style={{ marginVertical: 2 }}>{dumpster.info}</Text>
            </Layout>
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
    box: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 3,
        marginVertical: 2,
        borderRadius: 15,
    },
    boxRow: {
        flexDirection: "row",
    },
    infoBox: {
        marginVertical: 5,
        paddingVertical: 3,
        paddingHorizontal: 9,
        borderRadius: 15,
    },
    tagRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexWrap: "wrap",
    },
    tagBox: {
        paddingBottom: 5,
        paddingTop: 3,
        paddingHorizontal: 7,
        borderRadius: 15,
        marginRight: 3,
        marginBottom: 4,
    },
});
