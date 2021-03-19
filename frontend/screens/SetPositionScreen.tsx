import * as React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import { setPosition } from "../redux/slices/configSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import Place from "../models/Place";
import LocationSearcher from "../components/LocationSearcher";

export default function SetPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();

    return (
        <Layout style={styles.container}>
            <LocationSearcher onSubmit={onSubmit} />
        </Layout>
    );

    function onSubmit(place: Place) {
        dispatch(setPosition(place.position));
        navigation.pop();
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
