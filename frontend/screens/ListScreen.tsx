import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import DumpsterListCards from "../components/cards/DumpsterListCards";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch } from "../redux/store";
import {
    allDumpstersSelector,
    dumpsterMapSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import SearchHeader from "../components/basicComponents/SearchHeader";
import { Layout } from "@ui-kitten/components";
import FilterModal from "../components/FilterModal";
import { useState } from "react";
import { calcOrUseDistance } from "../utils/distance";
import {
    dumpsterFilterSelector,
    positionSelector,
} from "../redux/slices/configSlice";
import {
    coverPhotoMapSelector,
    setCoverPhoto,
} from "../redux/slices/photoSlice";
import { useEffect } from "react";
import { PhotoService } from "../services";
import useFilter from "../hooks/useFilter";

export default function ListScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const dumpsters = useSelector(allDumpstersSelector);
    const [showFilter, setShowFilter] = useState(false);
    const dumpsterMap = useSelector(dumpsterMapSelector);
    const p = useSelector(positionSelector);
    const coverPhotos = useSelector(coverPhotoMapSelector);
    const filteredDumpsters = useFilter();

    useEffect(() => {
        dumpsters.forEach(({ dumpsterID }) => {
            if (coverPhotos[dumpsterID] === undefined)
                // if it has never been fetched before
                PhotoService.getCoverPhoto(dumpsterID)
                    .then(photo =>
                        dispatch(setCoverPhoto({ dumpsterID, photo })),
                    )
                    .catch(e => {
                        if (e.message === "Request failed with status code 404")
                            dispatch(
                                setCoverPhoto({ dumpsterID, photo: null }),
                            );
                        else console.error(e);
                    }); // standard 404 can be ignored
        });
    }, [dumpsterMap]);

    return (
        <Layout style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <SearchHeader
                    onPressPlus={() => {
                        navigation.navigate("AddPositionScreen", {
                            screen: "AddPositionScreen",
                        });
                    }}
                    onPressFilter={() => setShowFilter(true)}
                />
                {showFilter && (
                    <FilterModal
                        visible={showFilter}
                        setVisible={setShowFilter}
                    />
                )}
                {filteredDumpsters
                    .sort(
                        (a, b) =>
                            calcOrUseDistance(p, a) - calcOrUseDistance(p, b),
                    )
                    .map(thisDumpster => (
                        <DumpsterListCards
                            key={thisDumpster.dumpsterID}
                            dumpster={thisDumpster}
                            onPress={() => {
                                dispatch(setCurrentDumpster(thisDumpster));
                                navigation.navigate("DetailsScreen", {
                                    screen: "DetailsScreen",
                                });
                            }}
                        />
                    ))}
            </ScrollView>
        </Layout>
    );
}

// jesus, dette kan trekkes ut i noe eget, kanskje
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
