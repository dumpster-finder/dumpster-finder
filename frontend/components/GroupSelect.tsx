import React from "react";
import { StyleSheet } from "react-native";
import {
    IndexPath,
    Layout,
    Select,
    SelectGroup,
    SelectItem,
} from "@ui-kitten/components";

export default function GroupSelect({
    sValue,
    label,
    values,
    onSelect,
}: {
    sValue: Array<IndexPath>;
    label: string;
    values: Record<string, string[]>;
    onSelect: (newValue: Array<IndexPath>) => void;
}) {



    const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
        new IndexPath(0, 0),
        new IndexPath(1, 1),
    ]);

    console.log(typeof multiSelectedIndex);
    const groupDisplayValues = multiSelectedIndex.map(index => {
        if (typeof index.section === "number") {
            const groupTitle = Object.keys(values)[index.section];
            return values[groupTitle][index.row];
        }
    });

    return (
        <Select
            label={label}
            style={styles.select}
            multiSelect={true}
            value={groupDisplayValues.join(", ")}
            placeholder="Multi"
            onSelect={index =>
                index instanceof Array && setMultiSelectedIndex(index)
            }
            selectedIndex={multiSelectedIndex}
        >
            {Object.keys(values).map(value => (
                <SelectGroup title={value}>
                    {values[value].map(data => (
                        <SelectItem title={data} />
                    ))}
                </SelectGroup>
            ))}
        </Select>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 192,
    },
    select: {
        flex: 1,
        margin: 2,
    },
});
