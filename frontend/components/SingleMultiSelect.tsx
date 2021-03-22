import * as React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";

export default function singleMultiSelect({
    sValue,
    label,
    values,
    onSelect,
}: {
    sValue: Array<IndexPath>;
    label: string;
    values: string[];
    onSelect: (newValue: Array<IndexPath>) => void;
}) {
    const val = sValue.map(value => values[value.row]);
    return (
        <Select
            label={label}
            multiSelect={true}
            selectedIndex={sValue}
            onSelect={index => index instanceof Array && onSelect(index)}
            placeholder="Choose..."
            value={val.join(", ")}
        >
            {values.map((value, i) => (
                <SelectItem title={value} key={i} />
            ))}
        </Select>
    );
}
