import * as React from "react";
import { View } from "react-native";
import { PlusIcon, FilterIcon, SearchIcon } from "./Icons";
import { Autocomplete, AutocompleteItem, Button } from "@ui-kitten/components";
import { useState } from "react";

export default function SearchHeader({
    onPressPlus,
}: {
    onPressPlus: () => void;
}) {
    const [text, setText] = useState("");
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Button
                style={{ width: "20%", margin: 2 }}
                appearance="ghost"
                status="danger"
                accessoryLeft={PlusIcon}
                onPress={onPressPlus}
            />
            <Autocomplete
                style={{ width: "100%" }}
                placeholder="Place your Text"
                accessoryLeft={SearchIcon}
                onChangeText={text => setText(text)}
                value={text}
            />
            <Button
                style={{ width: "20%", margin: 2 }}
                appearance="ghost"
                status="danger"
                accessoryLeft={FilterIcon}
            />
        </View>
    );
}
