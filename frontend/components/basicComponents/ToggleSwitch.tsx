import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Toggle } from "@ui-kitten/components";

export default function ToggleSwitch({
    name,
    checked,
    onChange,
}: {
    name: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <View style={styles.row}>
            <View style={styles.name}>
                <Text category={"h6"}>{name}</Text>
            </View>
            <View style={styles.toggle}>
                <Toggle checked={checked} onChange={v => onChange(v)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },
    name: {
        width: "50%",
        justifyContent: "center",
    },
    toggle: {
        width: "50%",
        alignItems: "flex-end",
    },
});
