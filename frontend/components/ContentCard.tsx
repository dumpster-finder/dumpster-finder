import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import Content from "../models/Content";
import { Card } from "@ui-kitten/components";
import { formatDate } from "../utils/date";

export default function ContentCard({
    content,
    onPress,
}: {
    content: Content;
    onPress: () => void;
}) {
    return (
        <Card onPress={onPress}>
            <View style={styles.view}>
                <View
                    style={{
                        width: "40%",
                        justifyContent: "center",
                    }}
                >
                    <Text category={"h5"}>{content.name}</Text>
                </View>

                <View
                    style={{
                        width: "30%",
                        flex: 1,
                        flexDirection: "column",
                    }}
                >
                    {content.amount && <Text>Amount: {content.amount}</Text>}
                    {content.unit && <Text>Unit: {content.unit}</Text>}
                    {content.quality && <Text>Quality: {content.quality}</Text>}
                </View>

                <View
                    style={{
                        width: "30%",
                    }}
                >
                    {content.expiryDate && (
                        <View style={styles.column}>
                            <Text>Expiration date:</Text>
                            <Text>{formatDate(content.expiryDate)}</Text>
                        </View>
                    )}

                    {content.foundDate && (
                        <View style={styles.column}>
                            <Text>Found date:</Text>

                            <Text>{formatDate(content.foundDate)}</Text>
                        </View>
                    )}
                </View>
            </View>
        </Card>
    );
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "row",
    },
    column: {
        flex: 1,
        flexDirection: "column",
    },
});
