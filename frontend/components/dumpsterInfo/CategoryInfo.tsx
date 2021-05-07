import * as React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Dumpster from "../../models/Dumpster";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const THRESHOLD = 8;

/**
 * Displays categories, hiding some if the amount is greater than a threshold of 8.
 *
 * @param categories
 */
export default function CategoryInfo({
    dumpster: { categories },
}: {
    dumpster: Dumpster;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    const [showAll, setShowAll] = useState(false);
    const limitedCategories =
        categories.length > THRESHOLD
            ? categories.slice(0, THRESHOLD)
            : categories;

    const renderCategory = (category: string) => (
        <Layout level="3" key={category} style={styles.tagBox}>
            <Text>{t(`categories:${category}`)}</Text>
        </Layout>
    );

    return (
        <View style={styles.infoView}>
            {/* CATEGORIES */}
            <Text style={{ alignSelf: "center" }}>{t("categories")}</Text>
            <View style={styles.tagRow}>
                {showAll
                    ? categories.map(renderCategory)
                    : limitedCategories.map(renderCategory)}
                {categories.length > limitedCategories.length && !showAll && (
                    <TouchableOpacity onPress={() => setShowAll(true)}>
                        <Layout level="3" key="more" style={styles.tagBox}>
                            <Text>{"…"}</Text>
                        </Layout>
                    </TouchableOpacity>
                )}
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
