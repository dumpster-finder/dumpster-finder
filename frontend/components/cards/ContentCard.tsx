import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import Content from "../../models/Content";
import { Card } from "@ui-kitten/components";
import { formatDate } from "../../utils/date";
import { useTranslation } from "react-i18next";

/**
 * Returns a card that displays the registered data for the content registered.
 * @param content
 * @param onPress
 *
 */
export default function ContentCard({
    content,
    onPress,
}: {
    content: Content;
    onPress: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("contents");
    return (
        <Card onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.nameView}>
                    <Text category={"h5"} style={styles.text}>
                        {content.name}
                    </Text>
                </View>

                <View style={styles.infoView}>
                    {content.amount && (
                        <View style={styles.row}>
                            <Text style={styles.boldText}>
                                {t("amountLabel")}:{" "}
                            </Text>
                            <Text style={styles.text}>{content.amount}</Text>
                        </View>
                    )}
                    {content.unit && (
                        <View style={styles.row}>
                            <Text style={styles.boldText}>
                                {t("unitLabel")}:{" "}
                            </Text>
                            <Text style={styles.text}>{content.unit}</Text>
                        </View>
                    )}
                    {content.quality && (
                        <View style={styles.row}>
                            <Text style={styles.boldText}>
                                {t("quality")}:{" "}
                            </Text>
                            <Text style={styles.text}>{content.quality}/5</Text>
                        </View>
                    )}
                </View>

                <View style={styles.dateView}>
                    {content.expiryDate && (
                        <View>
                            <Text style={styles.boldText}>
                                {t("expiryDate")}:
                            </Text>
                            <Text style={styles.text}>
                                {formatDate(content.expiryDate)}
                            </Text>
                        </View>
                    )}
                    {content.foundDate && (
                        <View>
                            <Text style={styles.boldText}>
                                {t("foundDate")}:
                            </Text>
                            <Text style={styles.text}>
                                {formatDate(content.foundDate)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Card>
    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    nameView: {
        width: "33.3%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingRight: 5,
    },
    infoView: {
        width: "33.3%",
        flexDirection: "column",
        paddingHorizontal: 5,
        alignItems: "flex-start",
    },
    dateView: {
        width: "33.3%",
        paddingLeft: 5,
    },
    text: {
        alignSelf: "flex-start",
    },
    boldText: {
        alignSelf: "flex-start",
        fontWeight: "bold",
    },
});
