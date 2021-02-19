import * as React from "react";
import { Card, Text, Icon } from "@ui-kitten/components";
import { View } from "./Themed";
import { Image, StyleSheet} from "react-native";
import Dumpster from "../models/Dumpster";

export default function ListCards({ dumpster, onPress}: { dumpster: Dumpster, onPress: () => void }) {
    return (
        <Card onPress={onPress}>
            <View style={styles.footerContainer}>
                <Image
                    style={{
                        alignItems: "stretch",
                        width: "40%",
                        height: "100%",
                    }}
                    source={{
                        uri:
                            "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
                    }}
                />
                <View style={{ width: "60%", height: "100%" }}>
                    <Text category="h6">{dumpster.name}</Text>
                    <Text>{dumpster.storeType}</Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}>
                        <View
                            style={{
                                width: "33%",
                                alignItems: "flex-start",
                            }}>
                            <Text>0.2 km</Text>
                        </View>
                        <View
                            style={{
                                width: "33%",
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}>
                            <View
                                style={{
                                    width: "50%",
                                    alignItems: "flex-end",
                                }}>
                                <Text>S</Text>
                            </View>
                            <View
                                style={{
                                    width: "50%",
                                    alignItems: "flex-start",
                                }}>
                                <Text>{dumpster.rating}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: "33%",
                                alignItems: "flex-end",
                            }}>
                            {dumpster.locked ? <Text> Locked</Text> : null}
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "center",
    },
    footerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    footerControl: {
        marginHorizontal: 2,
    },
    icon: {
        width: 32,
        height: 32,
    },
});
