import * as React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import Dumpster from "../../models/Dumpster";
import { useTranslation } from "react-i18next";

export default function CategoryInfo({ dumpster }: { dumpster: Dumpster }) {
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
        </View>
    );
}
const styles = StyleSheet.create({
    infoView: {
        marginVertical: 5,
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
