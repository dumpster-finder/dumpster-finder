import * as React from "react";
import {StyleSheet, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {positionSelector} from "../redux/slices/configSlice";
import PositionSetter from "../components/PositionSetter";

export default function AddPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const currentPosition = useSelector(positionSelector);

    return (
        <View style={styles.container}>
            <PositionSetter
                initialPosition={currentPosition}
                onSubmit={position => {
                    // TODO set the created dumpster's position
                    console.log(position);
                    navigation.navigate("AddInfoScreen", {
                        screen: "AddInfoScreen",
                    });
                }}
            />
        </View>
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
