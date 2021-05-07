import * as React from "react";
import { Card, Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import Dumpster from "../../models/Dumpster";
import { StarIcon, LockIcon } from "../basicComponents/Icons";
import { useSelector } from "react-redux";
import {
    positionSelector,
    visitsSelector,
} from "../../redux/slices/configSlice";
import { useTranslation } from "react-i18next";
import { coverPhotoSelector } from "../../redux/slices/photoSlice";
import { calcOrUseDistance } from "../../utils/distance";
const placeholder = require("../../assets/images/placeholder-wide.png");

export default function DumpsterListCards({
    dumpster,
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("storeType");
    const currentPosition = useSelector(positionSelector);
    const visitWindow = useSelector(visitsSelector);
    const coverPhoto = useSelector(coverPhotoSelector(dumpster.dumpsterID));

    return (
        <Card onPress={onPress} style={styles.card}>
            <View style={styles.insideContainer}>
                <Image
                    style={styles.photo}
                    source={coverPhoto ? { uri: coverPhoto.url } : placeholder}
                />

                <View style={styles.right}>
                    <Text category="h6">{dumpster.name}</Text>
                    <Text>{t(`${dumpster.storeType}`)}</Text>
                    <Text>
                        {t("visit:part1")} {dumpster.visits}{" "}
                        {dumpster.visits === 1
                            ? t("visit:time")
                            : t("visit:times")}{" "}
                        {visitWindow === 0
                            ? t("visit:dayText")
                            : visitWindow === 1
                            ? t("visit:daysText")
                            : t("visit:weekText")}
                    </Text>
                    <View style={styles.bottomContainer}>
                        <View style={styles.distanceContainer}>
                            <Text>
                                {calcOrUseDistance(
                                    currentPosition,
                                    dumpster,
                                ).toFixed(1)}{" "}
                                {t("km")}
                            </Text>
                        </View>
                        <View style={styles.ratingContainer}>
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
                        <View style={styles.lockContainer}>
                            {dumpster.locked && (
                                <LockIcon size="medium" color="faded" />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 6,
        marginVertical: 4,
    },
    insideContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    photo: {
        width: "40%",
        height: "100%",
    },
    right: {
        width: "60%",
        marginLeft: 12,
    },
    bottomContainer: {
        paddingTop: 2,
        flexDirection: "row",
    },
    distanceContainer: {
        flex: 1, // This is actually sensible usage of flex: 1
        flexDirection: "row",
        alignItems: "center",
    },
    ratingContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    lockContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});
