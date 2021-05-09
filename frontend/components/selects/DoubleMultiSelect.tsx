import React from "react";
import {
    IndexPath,
    Select,
    SelectGroup,
    SelectItem,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

//TODO Should we delete?
export default function DoubleMultiSelect({
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
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
        new IndexPath(0, 0),
        new IndexPath(1, 1),
    ]);

    const groupDisplayValues = multiSelectedIndex.map(index => {
        if (typeof index.section === "number") {
            const groupTitle = Object.keys(values)[index.section];
            return values[groupTitle][index.row];
        }
    });

    return (
        <Select
            label={label}
            multiSelect={true}
            value={groupDisplayValues.join(", ")}
            placeholder={t("dropdownPlaceholder")}
            onSelect={index =>
                index instanceof Array && setMultiSelectedIndex(index)
            }
            selectedIndex={multiSelectedIndex}
        >
            {Object.keys(values).map((value, index) => (
                <SelectGroup title={value} key={index}>
                    {values[value].map((data, i) => (
                        <SelectItem title={data} key={i} />
                    ))}
                </SelectGroup>
            ))}
        </Select>
    );
}
