import * as React from "react";
import {
    IndexPath,
    Select,
    SelectItem,
    SelectProps,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

/**
 * Displays a dropdown menu where the user can select multiple values
 * @param sValue
 * @param label
 * @param values
 * @param onSelect
 * @param placeholder
 * @param restProps
 */
export default function singleMultiSelect({
    sValue,
    label,
    values,
    onSelect,
    placeholder,
    ...restProps
}: {
    sValue: Array<IndexPath>;
    label: string;
    values: string[];
    onSelect: (newValue: Array<IndexPath>) => void;
    placeholder?: string;
} & Omit<SelectProps, "onSelect">) {
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
            {...restProps}
        >
            {values.map((value, i) => (
                <SelectItem title={value} key={i} />
            ))}
        </Select>
    );
}
