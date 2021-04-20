import React from "react";
import { Callout, Marker } from "react-native-maps";
import Dumpster from "../../models/Dumpster";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { visitsSelector } from "../../redux/slices/configSlice";

/**
 * Displays a dumpster as a marker on a map
 * Used in the map view
 *
 * @param dumpster The dumpster to display
 * @param onPress  What should happen when the callout/marker is tapped
 */
export default function({
    dumpster: { name, storeType, dumpsterType, position, visits },
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const visitWindow = useSelector(visitsSelector);
    return (
        <Marker coordinate={position}>
            <Callout onPress={onPress}>
                <View>
                    <Text category="h4">{name}</Text>
                    <Text>{t(`storeType:${storeType}`)}</Text>
                    <Text>{t(`dumpsterType:${dumpsterType}`)}</Text>
                    <Text>
                        {t("visit:part1")} {visits}{" "}
                        {visits === 1 ? t("visit:time") : t("visit:times")}{" "}
                        {visitWindow === 0
                            ? t("visit:dayText")
                            : visitWindow === 1
                            ? t("visit:daysText")
                            : t("visit:weekSelector")}
                    </Text>
                </View>
            </Callout>
        </Marker>
    );
}
