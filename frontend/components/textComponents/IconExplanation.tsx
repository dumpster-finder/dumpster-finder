import * as React from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import {
    CleanIcon,
    LockIcon,
    PositiveIcon,
    StarIcon,
    TrashIcon,
} from "../basicComponents/Icons";
import { useTranslation } from "react-i18next";

/**
 * Returns view with an explanation of icons used in the app
 *
 */
export default function IconExplanation() {
    const { t }: { t: (s: string) => string } = useTranslation("iconDesc");
    return (
        <View>
            <Text category={"h5"}>{t("title")}</Text>
            <View style={{ paddingVertical: 10 }}>
                <View style={styles.row}>
                    <LockIcon size="medium" />
                    <Text style={styles.textPart}>{t("locked")}</Text>
                </View>
                <View style={styles.row}>
                    <TrashIcon size="medium" />
                    <Text style={styles.textPart}>{t("emptySchedule")}</Text>
                </View>
                <View style={styles.row}>
                    <PositiveIcon size="medium" />
                    <Text style={styles.textPart}>{t("view")}</Text>
                </View>
                <View style={styles.row}>
                    <CleanIcon size="medium" color="green" />
                    <Text style={styles.textPart}>{t("cleanliness")}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    textPart: {
        paddingLeft: 5,
    },
});
