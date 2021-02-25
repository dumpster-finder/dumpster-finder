import * as React from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import { ButtonGroup } from "./ButtonGroup";
import { useState } from "react";

export default function ButtonGroupDisplay({
    values,
    onSelect,
}: {
    values: string[];
    onSelect: (newValue: number) => void;
}) {
    const width = 100 / values.length;
    const [selected, setSelected] = useState(1);
    return (
        <ButtonGroup style={{width: "90%"}} appearance="outline" status="basic">
            {values.map((value, i) => (
                <Button
                    key={i}
                    style={{ width: width + "%" }}
                    onPress={() => valueChange(i)}
                    appearance={selected === i ? "filled" : "outline"}
                >
                    {value}
                </Button>
            ))}
        </ButtonGroup>
    );
    function valueChange(i: number){
        setSelected(i)
        onSelect(i)
    }
}
