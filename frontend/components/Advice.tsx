import * as React from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function Advice() {
    const { t, i18n } = useTranslation();
    return (
        <View>
            {/*@ts-ignore*/}
            <Text category={"h5"}>{t("common:advice.title")} </Text>
            <View style={{ paddingVertical: 10 }}>
                {/*@ts-ignore*/}
                <Text style={styles.text}>{t("common:advice.nr1")}</Text>
                {/*@ts-ignore*/}
                <Text style={styles.text}>{t("common:advice.nr2")}</Text>
                {/*@ts-ignore*/}
                <Text style={styles.text}>{t("common:advice.nr3")}</Text>
                {/*@ts-ignore*/}
                <Text style={styles.text}>{t("common:advice.nr4")}</Text>
                {/*@ts-ignore*/}
                <Text style={styles.text}>{t("common:advice.nr5")}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
});
