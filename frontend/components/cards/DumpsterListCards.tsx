import * as React from "react";
import { Card, Text } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import Dumpster from "../../models/Dumpster";
import { StarIcon, LockIcon } from "../basicComponents/Icons";
import { useSelector } from "react-redux";
import { positionSelector } from "../../redux/slices/configSlice";
import { useTranslation } from "react-i18next";
import { calcOrUseDistance } from "../../utils/distance";

export default function DumpsterListCards({
    dumpster,
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("storeType");
    const currentPosition = useSelector(positionSelector);
    const pic =
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
                        uri: pic,
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
                            <Text>
                                {calcOrUseDistance(
                                    currentPosition,
                                    dumpster,
                                ).toFixed(1)}{" "}
                                {t("km")}
                            </Text>
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
