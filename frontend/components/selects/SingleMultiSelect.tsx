import * as React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

export default function singleMultiSelect({
    sValue,
    label,
    values,
    onSelect,
    placeholder,
}: {
    sValue: Array<IndexPath>;
    label: string;
    values: string[];
    onSelect: (newValue: Array<IndexPath>) => void;
    placeholder?: string;
}) {
    const { t }: { t: (s: string) => string } = useTranslation();
    const val = sValue.map(value => values[value.row]);
    return (
        <Select
            label={label}
            multiSelect={true}
            selectedIndex={sValue}
            onSelect={index => index instanceof Array && onSelect(index)}
            placeholder={placeholder || t("dropdownPlaceholder")!}
            value={val.join(", ")}
        >
            {values.map((value, i) => (
                <SelectItem title={value} key={i} />
            ))}
        </Select>
    );
}
