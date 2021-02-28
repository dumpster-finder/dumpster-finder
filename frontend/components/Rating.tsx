import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { CleanIcon, FadedCleanIcon } from "./Icons";

export default function Rating({
    value,
    onChange,
    stringList
}: {
    value: number;
    onChange: (newValue: number) => void;
    stringList:string[];
}) {

    return (
        <View style={{ alignItems: "center" }}>
            <Text>{stringList[value]}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {stringList.map((data, i) => (
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
