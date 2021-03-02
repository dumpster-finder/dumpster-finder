import * as React from "react";
import {StyleSheet} from "react-native";
import { Layout } from "@ui-kitten/components";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { positionSelector, setPosition } from "../redux/slices/configSlice";
import PositionSetter from "../components/PositionSetter";
import { StackNavigationProp } from "@react-navigation/stack";

export default function SetPositionScreen() {
    const dispatch = useAppDispatch();
    const currentPosition = useSelector(positionSelector);

    return (
        <Layout style={styles.container}>
            <PositionSetter
                initialPosition={currentPosition}
                onSubmit={position => {
                    // TODO set the created dumpster's position
                    dispatch(setPosition(position));
                }}
            />
        </Layout>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
    },
});
