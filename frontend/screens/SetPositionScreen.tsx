import * as React from "react";
import { StyleSheet } from "react-native";
import { Autocomplete, AutocompleteItem, Layout } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { positionSelector, setPosition } from "../redux/slices/configSlice";
import PositionSetter from "../components/PositionSetter";
import { StackNavigationProp } from "@react-navigation/stack";
import Place from "../models/Place";
import { useCallback, useEffect, useState } from "react";
import { Text } from "@ui-kitten/components";
import _ from "lodash";
import { PlaceService } from "../services";
import { SearchIcon } from "../components/Icons";

export default function SetPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const currentPosition = useSelector(positionSelector);

    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [query, setQuery] = useState("");
    const [place, setPlace] = useState<Place | null>(null);
    const debouncedSearch = useCallback(
        _.throttle(search, 1000, { leading: false }),
        [suggestions, setSuggestions],
    );

    return (
        <Layout style={styles.container}>
            <Autocomplete
                placeholder="e.g. Paris"
                label="Your location"
                value={query}
                size="large"
                onChangeText={handleChange}
                onSelect={i => setPlace(suggestions[i])}
                enablesReturnKeyAutomatically
                style={{ width: "80%" }}
                accessoryLeft={SearchIcon}
            >
                {suggestions.map(s => (
                    <AutocompleteItem
                        key={s.name}
                        title={`${s.name}, ${s.city}`}
                        onPress={() => setPlace(s)}
                    />
                ))}
            </Autocomplete>
            <Text>{place ? `${place.name} ${place.city}` : "nah"}</Text>
            <Text>
                {place
                    ? `(${place.position.latitude} ${place.position.longitude})`
                    : "nah"}
            </Text>
        </Layout>
    );

    function handleChange(text: string) {
        setQuery(text);
        debouncedSearch(text);
    }

    async function search(text: string) {
        console.log("SEARCH", suggestions.length);
        try {
            setSuggestions(await PlaceService.search(text));
        } catch (e) {
            console.error(e, "What happened?");
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "4%",
    },
});
