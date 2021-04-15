import * as React from "react";
import { Card, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { ArrowDownIcon, ArrowUpIcon } from "../basicComponents/Icons";

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
