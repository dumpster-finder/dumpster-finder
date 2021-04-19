import * as React from "react";
import { Card, Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import Dumpster from "../../models/Dumpster";
import { StarIcon, LockIcon } from "../basicComponents/Icons";
import { useSelector } from "react-redux";
import { positionSelector } from "../../redux/slices/configSlice";
import { useTranslation } from "react-i18next";
import { coverPhotoSelector } from "../../redux/slices/photoSlice";

export default function DumpsterListCards({
    dumpster,
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("storeType");
    const currentPosition = useSelector(positionSelector);
    const coverPhoto = useSelector(coverPhotoSelector(dumpster.dumpsterID));
    const placeholder =
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg";
    return (
        <Card onPress={onPress}>
            <View style={styles.footerContainer}>
                <Image
                    style={{
                        width: "40%",
                        height: "100%",
                    }}
                    source={{
                        uri: coverPhoto ? coverPhoto.url : placeholder,
                    }}
                />

                <View style={{ width: "60%", height: "100%", marginLeft: 5 }}>
                    <Text category="h6">{dumpster.name}</Text>
                    <Text>{t(`${dumpster.storeType}`)}</Text>
                    <Text>
                        {t("visit:part1")} {dumpster.visits} {t("visit:part2")}
                    </Text>
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
                                <Text>{dumpster.rating.toFixed(1)}</Text>
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
        const earthRadiusKm = 6371;

        const dLat =
            ((currentPosition.latitude - dumpster.position.latitude) *
                Math.PI) /
            180;
        const dLon =
            ((currentPosition.longitude - dumpster.position.longitude) *
                Math.PI) /
            180;

        const lat1 = (currentPosition.latitude * Math.PI) / 180;
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
