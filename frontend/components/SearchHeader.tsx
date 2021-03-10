import * as React from "react";
import { View } from "react-native";
import { PlusIcon, FilterIcon, SearchInputIcon, RefreshIcon } from "./Icons";
import { Autocomplete, AutocompleteItem, Button } from "@ui-kitten/components";
import { useState } from "react";
import { fetchNearbyDumpsters } from "../redux/slices/dumpsterSlice";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { positionSelector, radiusSelector } from "../redux/slices/configSlice";

export default function SearchHeader({
    onPressPlus,
}: {
    onPressPlus: () => void;
}) {
    const [text, setText] = useState("");
    // TODO remove afterwards
    const radius = useSelector(radiusSelector);
    const position = useSelector(positionSelector);
    const dispatch = useAppDispatch();
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
                style={{ width: "10%", margin: 2 }}
                appearance="ghost"
                status="danger"
                accessoryLeft={PlusIcon}
                onPress={onPressPlus}
            />
            <View style={{ width: "70%" }}>
                <Autocomplete
                    style={{ width: "100%" }}
                    placeholder="Place your Text"
                    accessoryLeft={SearchInputIcon}
                    onChangeText={text => setText(text)}
                    value={text}
                />
            </View>

            <Button
                style={{ width: "10%", margin: 2 }}
                appearance="ghost"
                status="danger"
                onPress={() => {
                    // TODO remove when tested
                    dispatch(fetchNearbyDumpsters({ position, radius }));
                }}
                accessoryLeft={RefreshIcon}
            />
            <Button
                style={{ width: "10%", margin: 2 }}
                appearance="ghost"
                status="danger"
                accessoryLeft={FilterIcon}
            />
        </View>
    );
}
