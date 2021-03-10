import * as React from "react";
import { StyleSheet } from "react-native";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Icon,
    Layout,
} from "@ui-kitten/components";
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
import { SaveButtonIcon, SearchInputIcon } from "../components/Icons";

export default function SetPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const currentPosition = useSelector(positionSelector);

    const [suggestions, setSuggestions] = useState<Place[]>([
        new Place({
            position: { latitude: 0, longitude: 0 },
            name: "", // just to get Kitten to work, an element has to be present in the autocomplete list
        }),
    ]);
    const [query, setQuery] = useState("");
    const [place, setPlace] = useState<Place | null>(null);

    // Create a debounced version of the search function
    // to prevent delay
    const debouncedSearch = useCallback(
        _.debounce(search, 1000, { leading: false }),
        [suggestions],
    );

    useEffect(() => {});

    return (
        <Layout style={styles.container}>
            <Autocomplete
                placeholder="e.g. Paris"
                label="Your location"
                value={query}
                size="large"
                onChangeText={handleChange}
                onSelect={i => setPlace(suggestions[i])}
                style={{ width: "80%" }}
                accessoryLeft={SearchInputIcon}
            >
                {suggestions.map(s => (
                    <AutocompleteItem
                        key={s.name}
                        title={s.toString()}
                        onPress={() => setPlace(s)}
                    />
                ))}
            </Autocomplete>
            <Text>{place ? place.toString() : "No position set"}</Text>
            <Text>
                {place
                    ? `(${place.position.latitude.toFixed(
                          2,
                      )}, ${place.position.longitude.toFixed(2)})`
                    : ""}
            </Text>
            <Button
                status="primary"
                accessoryLeft={SaveButtonIcon}
                onPress={handleSubmit}
                disabled={!place}
            >
                Save position
            </Button>
        </Layout>
    );

    function handleChange(text: string) {
        setQuery(text);
        debouncedSearch(text);
    }

    async function search(text: string) {
        try {
            setSuggestions(await PlaceService.search(text));
        } catch (e) {
            console.error(e, "Failed to fetch search results");
        }
    }

    function handleSubmit() {
        if (place) {
            dispatch(setPosition(place.position));
            navigation.pop();
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
