import * as React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";

export default function Dropdown({
    value,
    label,
    values,
    placeholder,
    onSelect,
}: {
    value: number;
    placeholder?: string;
    label: string;
    values: string[];
    onSelect: (newValue: number) => void;
}) {
       return (
           <Select
               label={label}
               selectedIndex={new IndexPath(value)}
               placeholder={placeholder || "Choose..." /* TODO make the placeholder work*/}
               value={values[value] || placeholder || "Choose..."}
               onSelect={valueChange}
               style={{ width: "48%", margin: "2%" }}
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
