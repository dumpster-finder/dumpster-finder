import * as React from "react";
import { Button, Text } from "@ui-kitten/components";
import { ButtonGroup } from "./ButtonGroup";
import { StyleSheet, View } from "react-native";
import { UnthemedIcon } from "./Icons";

export default function ButtonGroupDisplay({
    value,
    values,
    icon,
    label,
    onSelect,
}: {
    value: number;
    values: string[];
    label?: string;
    icon?: typeof UnthemedIcon;
    onSelect: (newValue: number) => void;
}) {
    const width = 100 / values.length;
    return (
        <View style={styles.container}>
            {label &&
                (icon ? (
                    <View style={styles.labelRow}>
                        <View style={styles.spacer} />
                        {/* TODO align this better */}
                        <Text
                            style={styles.label}
                            category="s2"
                            appearance="hint"
                        >
                            {label}
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.label} category="s2" appearance="hint">
                        {label}
                    </Text>
                ))}
            <View style={styles.row}>
                {icon && (
                    <View style={styles.icon}>
                        {React.createElement(icon, { size: "medium" })}
                    </View>
                )}
                <ButtonGroup appearance="outline" status="basic">
                    {values.map((name, i) => (
                        <Button
                            key={i}
                            style={{ width: width + "%" }}
                            onPress={() => onSelect(i)}
                            appearance={value === i ? "filled" : "outline"}
                        >
                            {name}
                        </Button>
                    ))}
                </ButtonGroup>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        flexDirection: "column",
        marginVertical: 4,
    },
    label: {
        marginBottom: 4,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "flex-start",
    },
    row: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    spacer: {
        width: "5.5%",
    },
    icon: {
        width: "10%",
    },
});
