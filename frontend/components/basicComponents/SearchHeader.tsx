import * as React from "react";
import { View } from "react-native";
import { FilterIcon, SearchInputIcon } from "./Icons";
import { Autocomplete, Button } from "@ui-kitten/components";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
    dumpsterFilterSelector,
    setDumpsterFilter,
} from "../../redux/slices/configSlice";
import { useTranslation } from "react-i18next";
import _ from "lodash";

export default function SearchHeader({
    onPressFilter,
}: {
    onPressPlus: () => void;
    onPressFilter: () => void;
}) {
    const dispatch = useAppDispatch();
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const filter = useSelector(dumpsterFilterSelector);
    const [query, setQuery] = useState(filter.query || "");

    // Update the filter to include the current query
    const search = (query: string) => {
        console.log(filter);
        dispatch(setDumpsterFilter({ ...filter, query }));
    };

    // Use debounce to prevent severe delay
    // TODO debounce uses an OLD filter,
    //      this must be adapted for Redux!
    // const debouncedSearch = useCallback(
    //     _.debounce(search, 500, { leading: false }),
    //     [],
    // );

    // Immediately update state, debounce actual search
    const handleSearchInput = (text: string) => {
        setQuery(text);
        // debouncedSearch(text);
        search(text);
    };

    useEffect(() => {
        if (filter.query) setQuery(filter.query);
        else setQuery("");
    }, [filter]);

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "flex-end",
                paddingTop: 7,
                paddingBottom: 3,
            }}
        >
            <View style={{ width: "3%" }} />
            <View
                style={{
                    width: "82%",
                }}
            >
                <Autocomplete
                    style={{
                        width: "100%",
                    }}
                    placeholder={t("searchPlaceholder")}
                    accessoryLeft={SearchInputIcon}
                    onChangeText={handleSearchInput}
                    value={query}
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
