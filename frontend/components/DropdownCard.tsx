import * as React from "react";
import {Card, IndexPath, Select, SelectItem, Text} from "@ui-kitten/components";
import {StyleSheet, View} from "react-native";
import {ArrowDownIcon, ArrowRightIcon, ArrowUpIcon} from "./Icons";

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
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "100%",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    rowBorder: {
        flex: 1,
        flexDirection: "row",
        width: "95%",
    },
});
