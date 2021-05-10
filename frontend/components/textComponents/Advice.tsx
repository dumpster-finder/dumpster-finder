import * as React from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

/**
 * A view with advice for dumpster divers
 *
 */
export default function Advice() {
    // Specify the namespace when you get the t function
    const { t }: { t: (s: string) => string } = useTranslation("advice");
    return (
        <View>
            {/* Then you don't need to specify it all the time here */}
            <Text category={"h5"}>{t("title")!} </Text>
            <View style={{ paddingVertical: 10 }}>
                <Text style={styles.text}>{t("nr1")!}</Text>
                <Text style={styles.text}>{t("nr2")!}</Text>
                <Text style={styles.text}>{t("nr3")!}</Text>
                <Text style={styles.text}>{t("nr4")!}</Text>
                <Text style={styles.text}>{t("nr5")!}</Text>
                <Text style={styles.text}>{t("nr6")!}</Text>
                <Text style={styles.text}>{t("nr7")!}</Text>
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
