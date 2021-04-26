import * as React from "react";
import { Autocomplete, AutocompleteItem, Button } from "@ui-kitten/components";
import Place from "../../models/Place";
import { useCallback, useEffect, useState } from "react";
import { Text } from "@ui-kitten/components";
import _ from "lodash";
import { PlaceService } from "../../services";
import {
    PendingButtonIcon,
    SaveButtonIcon,
    SearchInputIcon,
} from "../basicComponents/Icons";
import { useTranslation } from "react-i18next";
import Message from "../../utils/Message";
import MapView from "react-native-maps";
import CustomMapView from "../map/CustomMapView";
import PositionMarker, { DraggableMarker } from "../map/PositionMarker";
import { StyleSheet } from "react-native";
import Position from "../../models/Position";

export default function LocationSearcher({
    onSubmit,
    initialPosition = { latitude: 63.43, longitude: 10.4 },
    Marker = PositionMarker,
}: {
    onSubmit: (position: Position) => void;
    initialPosition?: Position;
    Marker?: DraggableMarker;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("position");
    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [query, setQuery] = useState("");
    const [place, setPlace] = useState<Place | null>(null);
    const [mapView, setMapView] = useState<MapView | null>(null);
    const setPosition = (position: Position) =>
        setPlace(new Place({ ...place, position }));

    useEffect(() => {
        if (mapView && place)
            mapView.animateCamera({
                center: place.position,
            });
    }, [place]);

    // Create a debounced version of the search function
    // to prevent delay
    const debouncedSearch = useCallback(
        _.debounce(search, 1000, { leading: false }),
        [suggestions],
    );

    return (
        <>
            <Autocomplete
                label={t("searchBox.label")}
                placeholder={t("searchBox.placeholder")}
                value={query}
                size="large"
                onChangeText={handleChange}
                onSelect={i => setPlace(suggestions[i])}
                style={styles.autocomplete}
                accessoryLeft={SearchInputIcon}
            >
                {suggestions.length > 0 ? (
                    suggestions.map(s => (
                        <AutocompleteItem
                            key={s.name}
                            title={s.toString()}
                            onPress={() => setPlace(s)}
                        />
                    ))
                ) : (
                    <AutocompleteItem
                        title={t("searchBox.pending")}
                        accessoryLeft={PendingButtonIcon}
                    />
                )}
            </Autocomplete>
            <Text style={styles.placeName}>
                {place ? place.toString() || t("unknown") : t("none")}
            </Text>
            <Text style={styles.text}>{t("help")}</Text>
            <CustomMapView
                initialPosition={initialPosition}
                setRef={setMapView}
                style={styles.map}
                onPress={setPosition}
            >
                <Marker
                    position={place ? place.position : initialPosition}
                    onChange={setPosition}
                />
            </CustomMapView>
            <Text style={styles.text} category="s2">
                {place // Four decimal places seems adequate
                    ? // (see https://gis.stackexchange.com/a/8674)
                      `(${place.position.latitude.toFixed(
                          4,
                      )}, ${place.position.longitude.toFixed(4)})`
                    : ""}
            </Text>
            <Button
                status="primary"
                accessoryLeft={SaveButtonIcon}
                onPress={() => place && onSubmit(place.position)}
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
            Message.error(e, "Failed to fetch search results");
        }
    }
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        flex: 4,
        // TODO remove this
        //      when the issue w/intro has been fixed
        //      (this being 60% caused an actual issue earlier, where the button could not be pressed!)
        minHeight: "50%",
    },
    autocomplete: {
        width: "80%",
    },
    placeName: {
        fontWeight: "bold",
    },
    text: {
        marginVertical: 4,
    },
});
