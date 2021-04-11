import * as React from "react";
import { Autocomplete, AutocompleteItem, Button } from "@ui-kitten/components";
import Place from "../models/Place";
import { useCallback, useEffect, useState } from "react";
import { Text } from "@ui-kitten/components";
import _ from "lodash";
import { PlaceService } from "../services";
import { SaveButtonIcon, SearchInputIcon } from "../components/Icons";
import { useTranslation } from "react-i18next";

export default function LocationSearcher({
    onSubmit,
}: {
    onSubmit: (place: Place) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("position");
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

    return (
        <>
            <Autocomplete
                placeholder={t("pos")}
                label={t("yourPos")}
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
            <Text>{place ? place.toString() : t("none")}</Text>
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
                onPress={() => place && onSubmit(place)}
                disabled={!place}
            >
                {t("save")}
            </Button>
        </>
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
}
