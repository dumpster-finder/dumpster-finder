import * as React from "react";
import { View } from "react-native";
import { useState } from "react";
import { Button, Text } from "@ui-kitten/components";
import { CleanIcon, FadedCleanIcon } from "./Icons";

export default function Rating({
    value,
    onChange,
}: {
    value: number;
    onChange: (newValue: number) => void;
}) {
    const cleanlinessRange = [
        "Filthy",
        "Dirty",
        "Average",
        "Clean",
        "Pristine",
    ];
    return (
        <View style={{ alignItems: "center" }}>
            <Text>{cleanlinessRange[value]}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {cleanlinessRange.map((data, i) => (
                    <>
                        <Button
                            appearance="ghost"
                            key={i}
                            style={{ width: "10%" }}
                            onPress={() => onChange(i)}
                            accessoryLeft={
                                value >= i ? CleanIcon : FadedCleanIcon
                            }
                        />
                    </>
                ))}
            </View>
        </View>
    );
}
