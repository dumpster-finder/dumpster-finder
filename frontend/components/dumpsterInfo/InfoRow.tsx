import Dumpster from "../../models/Dumpster";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
    BrushIcon,
    LockIcon,
    OpenLockIcon,
    StarIcon,
} from "../basicComponents/Icons";
import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";

/**
 * Displays information in a row.
 * @param dumpster
 *
 */
export default function InfoRow({ dumpster }: { dumpster: Dumpster }) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    return (
        <Layout level="2" style={styles.box}>
            {dumpster.rating && (
                <View style={styles.boxRow}>
                    <StarIcon size="small" />
                    <Text style={styles.rowText}>
                        {t("rating")}: {dumpster.rating.toFixed(1)}/5
                    </Text>
                </View>
            )}

            <View style={styles.boxRow}>
                <BrushIcon size="small" />
                <Text style={styles.rowText}>
                    {t("cleanliness")}: {dumpster.cleanliness}/5
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
    );
}
const styles = StyleSheet.create({
    rowText: {
        marginLeft: 3,
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
});
