import * as React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { StackNavigationProp } from "@react-navigation/stack";
import DumpsterMarker from "../components/map/DumpsterMarker";
import { useAppDispatch } from "../redux/store";
import {
    allDumpstersSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { useSelector } from "react-redux";
import {
    firstTimeSelector,
    positionSelector,
} from "../redux/slices/configSlice";
import { useEffect, useState } from "react";
import SearchHeader from "../components/basicComponents/SearchHeader";
import { Layout } from "@ui-kitten/components";
import MapPositionMarker from "../components/map/MapPositionMarker";
import CustomMapView from "../components/map/CustomMapView";
import FilterModal from "../components/FilterModal";
import useFilter from "../hooks/useFilter";
import { FloatingAction } from "react-native-floating-action";
import FloatButton from "../components/basicComponents/FloatButton";

export default function MapScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(positionSelector);
    const firstTime = useSelector(firstTimeSelector);
    const dumpsters = useFilter();
    const [mapView, setMapView] = useState<MapView | null>(null);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (mapView && !firstTime)
            mapView.animateCamera({
                center: position,
            });
    }, [position]);

    return (
        <Layout style={styles.container}>
            <SearchHeader
                onPressPlus={() => {
                    navigation.navigate("AddPositionScreen", {
                        screen: "AddPositionScreen",
                    });
                }}
                onPressFilter={() => setShowFilter(true)}
            />
            {showFilter && (
                <FilterModal visible={showFilter} setVisible={setShowFilter} />
            )}
            <CustomMapView
                initialPosition={position}
                setRef={setMapView}
                style={styles.map}
            >
                <MapPositionMarker position={position} />
                {dumpsters.map(dumpster => (
                    <DumpsterMarker
                        key={dumpster.dumpsterID}
                        dumpster={dumpster}
                        onPress={() => {
                            // TODO: Discuss what we are to do here.
                            //       This sets the dumpster of the details view
                            //       in the list tab as well as the map tab!
                            dispatch(setCurrentDumpster(dumpster));
                            navigation.navigate("DetailsScreen");
                        }}
                    />
                ))}
            </CustomMapView>
            <FloatButton
                onPress={() => navigation.navigate("AddPositionScreen")}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    map: {
        flex: 9,
        width: "100%",
    },
});
