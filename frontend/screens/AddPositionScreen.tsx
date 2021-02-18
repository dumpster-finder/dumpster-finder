import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";

export default function AddPositionScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    return (
        <View style={styles.container}>
            <View
                style={{
                    height: "100%",
                    width: 400,
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                <View
                    style={{
                        height: "80%",
                        width: "90%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text h4>I am a map</Text>
                </View>
                <View
                    style={{
                        height: "10%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Button
                        title="Set position"
                        onPress={() => {
                            navigation.navigate("AddInfoScreen", {
                                screen: "AddInfoScreen",
                            });
                        }}
                        style={{ width: " 50%" }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexGrow: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    width: {
        width: "100%",
    },
});
