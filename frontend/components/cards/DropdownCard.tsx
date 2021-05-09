import * as React from "react";
import { Card, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { ArrowDownIcon, ArrowUpIcon } from "../basicComponents/Icons";

/**
 * Function that creates a clickable card that displays a name and an arrow to show if it is clicked.
 * @param value
 * @param text
 * @param onClick
 *
 */
export default function DropdownCard({
    value,
    text,
    onClick,
}: {
    value: boolean;
    text: string;
    onClick: (newValue: boolean) => void;
}) {
    return (
        <Card onPress={() => onClick(!value)}>
            <View style={styles.row}>
                <View style={{ width: "50%" }}>
                    <Text category={"h6"}>{text}</Text>
                </View>
                <View style={{ width: "50%", alignItems: "flex-end" }}>
                    {value ? (
                        <ArrowUpIcon size="medium" />
                    ) : (
                        <ArrowDownIcon size="medium" />
                    )}
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },
});
