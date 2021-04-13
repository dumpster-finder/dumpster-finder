import * as React from "react";
import { View } from "react-native";
import { PlusIcon, FilterIcon, SearchInputIcon, RefreshIcon } from "./Icons";
import { Autocomplete, Button, Input } from "@ui-kitten/components";
import { useState } from "react";
import { fetchNearbyDumpsters } from "../redux/slices/dumpsterSlice";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { positionSelector, radiusSelector } from "../redux/slices/configSlice";
import { useTranslation } from "react-i18next";

export default function SearchHeader({
    onPressPlus,
    onPressFilter,
}: {
    onPressPlus: () => void;
    onPressFilter: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
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
                justifyContent: "center",
                paddingVertical: 5,
            }}
        >
            <Button
                style={{ width: "15%" }}
                appearance="ghost"
                size={"medium"}
                accessoryLeft={PlusIcon}
                onPress={onPressPlus}
            />
            <View style={{ width: "70%" }}>
                <Autocomplete
                    style={{
                        width: "100%",
                    }}
                    placeholder={t("searchPlaceholder")}
                    accessoryLeft={SearchInputIcon}
                    onChangeText={text => setText(text)}
                    value={text}
                />
            </View>

            <Button
                style={{ width: "15%" }}
                appearance="ghost"
                size={"medium"}
                accessoryLeft={FilterIcon}
                onPress={onPressFilter}
            />
        </View>
    );
}
