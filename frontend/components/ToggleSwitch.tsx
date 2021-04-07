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
            <View style={{ width: "50%", justifyContent: "center" }}>
                <Text category={"h6"}>{name}</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
                <Toggle checked={checked} onChange={v => onChange(v)} />
            </View>
        </View>
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
        width: "98%",
    },
    columnBorder: {
        flex: 1,
        flexDirection: "column",
        width: "98%",
        alignItems: "center",
        marginVertical: 5,
    },

    dropdownView: {
        padding: 10,
    },
});
