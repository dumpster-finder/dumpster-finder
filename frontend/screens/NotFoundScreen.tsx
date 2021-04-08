import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList } from "../types";
import { Layout } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

export default function NotFoundScreen({
    navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
    const { t }: { t: (s: string) => string } = useTranslation("settings");
    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>{t("text")}</Text>
            <TouchableOpacity
                onPress={() => navigation.replace("Root")}
                style={styles.link}
            >
                <Text style={styles.linkText}>{t("back")}</Text>
            </TouchableOpacity>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#2e78b7",
    },
});
