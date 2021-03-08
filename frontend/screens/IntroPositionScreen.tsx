import * as React from "react";
import { useAppDispatch } from "../redux/store";
import { setPosition, setFirstTime } from "../redux/slices/configSlice";
import { Layout } from "@ui-kitten/components";
import PositionSetter from "../components/PositionSetter";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";

export default function IntroPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const currentPosition = { latitude: 63.41775, longitude: 10.404344 };

    return (
        <Layout style={styles.container}>
            <PositionSetter
                initialPosition={currentPosition}
                onSubmit={position => {
                    dispatch(setPosition(position));
                    dispatch(setFirstTime(false));
                    navigation.dispatch(StackActions.popToTop);
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
