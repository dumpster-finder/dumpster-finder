import * as React from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import { ButtonGroup } from "./ButtonGroup";
import { useState } from "react";

export default function ButtonGroupDisplay({
    value,
    values,
    onSelect,
}: {
    value:number;
    values: string[];
    onSelect: (newValue: number) => void;
}) {
    const width = 100 / values.length;
    console.log(value)
    return (
        <ButtonGroup style={{width: "90%"}} appearance="outline" status="basic">
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
    );

}
