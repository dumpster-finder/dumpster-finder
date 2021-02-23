import * as React from "react";
import { Card, Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import Dumpster from "../models/Dumpster";
import { StarIcon, LockIcon } from "./Icons";

export default function ListCards({
    dumpster,
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    const pic =
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg";
    return (
        <Card onPress={onPress}>
            <View style={styles.footerContainer}>
                <Image
                    style={{
                        resizeMode: "contain",
                        width: "40%",
                        height: "100%",
                    }}
                    source={{
                        uri: pic,
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
                        }}
                    >
                        <View
                            style={{
                                width: "33%",
                                alignItems: "flex-start",
                            }}
                        >
                            <Text>{setDistance()} km</Text>
                        </View>
                        <View
                            style={{
                                width: "33%",
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}
                        >
                            <View
                                style={{
                                    width: "50%",
                                    alignItems: "flex-end",
                                }}
                            >
                                <StarIcon size="medium" />
                            </View>
                            <View
                                style={{
                                    width: "50%",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Text>{dumpster.rating}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                width: "33%",
                                alignItems: "flex-end",
                            }}
                        >
                            {dumpster.locked ? (
                                <LockIcon size="medium" />
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );

    function setDistance() {
        const here = [63.41974342191292, 10.402676756914719];
        const earthRadiusKm = 6371;

        const dLat = ((here[0] - dumpster.position.latitude) * Math.PI) / 180;
        const dLon = ((here[1] - dumpster.position.longitude) * Math.PI) / 180;

        const lat1 = (here[0] * Math.PI) / 180;
        const lat2 = (dumpster.position.latitude * Math.PI) / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
                Math.sin(dLon / 2) *
                Math.cos(lat1) *
                Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusKm * c;
        return distance.toFixed(1);
    }
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
