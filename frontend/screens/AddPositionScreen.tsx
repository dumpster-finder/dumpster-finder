import * as React from "react";
import {StyleSheet} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {positionSelector} from "../redux/slices/configSlice";
import PositionSetter from "../components/PositionSetter";
import {useAppDispatch} from "../redux/store";
import {setEditorPosition} from "../redux/slices/editorSlice";
import {Layout} from "@ui-kitten/components";

export default function AddPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const currentPosition = useSelector(positionSelector);

    return (
        <Layout style={styles.container}>
            <PositionSetter
                initialPosition={currentPosition}
                onSubmit={position => {
                    dispatch(setEditorPosition(position));
                    navigation.navigate("AddInfoScreen", {
                        screen: "AddInfoScreen",
                    });
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
