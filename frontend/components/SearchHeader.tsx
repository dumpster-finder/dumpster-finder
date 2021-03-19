import * as React from "react";
import { View } from "react-native";
import { PlusIcon, FilterIcon, SearchIcon, RefreshIcon } from "./Icons";
import { Autocomplete, Button } from "@ui-kitten/components";
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
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingVertical: 5,
            }}
        >
            <Button
                appearance="ghost"
                size={"medium"}
                accessoryLeft={PlusIcon}
                onPress={onPressPlus}
            />
            <Autocomplete
                placeholder="Place your Text"
                accessoryLeft={SearchIcon}
                onChangeText={text => setText(text)}
                value={text}
            />
            <Button
                appearance="ghost"
                size={"medium"}
                onPress={() => {
                    // TODO remove when tested
                    dispatch(fetchNearbyDumpsters({ position, radius }));
                }}
                accessoryLeft={RefreshIcon}
            />
            <Button
                appearance="ghost"
                size={"medium"}
                accessoryLeft={FilterIcon}
            />
        </View>
    );
}
