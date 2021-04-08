import * as React from "react";
import {
    IndexPath,
    Select,
    SelectItem,
    SelectProps,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

export default function Dropdown({
    value,
    label,
    values,
    placeholder,
    onSelect,
    status,
    caption,
    ...restProps
}: {
    value: number;
    placeholder?: string;
    label: string;
    values: string[];
    onSelect: (newValue: number) => void;
} & Omit<SelectProps, "onSelect">) {
    const { t } = useTranslation();
    return (
        <Select
            label={label}
            status={status || "basic"}
            selectedIndex={new IndexPath(value)}
            placeholder={
                placeholder ||
                t("dropdownPlaceholder")! /* TODO make the placeholder work*/
            }
            value={values[value] || placeholder || t("dropdownPlaceholder")!}
            onSelect={valueChange}
            caption={caption || ""}
            {...restProps}
        >
            {values.map((type, i) => (
                <SelectItem key={i} title={type} />
            ))}
        </Select>
    );

    function valueChange(i: IndexPath | IndexPath[]) {
        if (i instanceof IndexPath) {
            onSelect(i.row);
        }
    }
}
