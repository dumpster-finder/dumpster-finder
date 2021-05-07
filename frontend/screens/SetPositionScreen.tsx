import * as React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import { positionSelector, setPosition } from "../redux/slices/configSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import LocationSearcher from "../components/compoundComponents/LocationSearcher";
import Position from "../models/Position";
import { useSelector } from "react-redux";

export default function SetPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(positionSelector);

    return (
        <Layout style={styles.container}>
            <LocationSearcher initialPosition={position} onSubmit={onSubmit} />
        </Layout>
    );

    function onSubmit(position: Position) {
        dispatch(setPosition(position));
        navigation.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 8,
    },
});
