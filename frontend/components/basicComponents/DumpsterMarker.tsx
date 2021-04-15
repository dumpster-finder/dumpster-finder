import React from "react";
import { Callout, Marker } from "react-native-maps";
import Dumpster from "../../models/Dumpster";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

/**
 * Displays a dumpster as a marker on a map
 * Used in the map view
 *
 * @param dumpster The dumpster to display
 * @param onPress  What should happen when the callout/marker is tapped
 */
export default function({
    dumpster: { name, storeType, dumpsterType, position },
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const visitors = 5;
    return (
        <Marker coordinate={position}>
            <Callout onPress={onPress}>
                <View>
                    <Text category="h4">{name}</Text>
                    <Text>{t(`storeType:${storeType}`)}</Text>
                    <Text>{t(`dumpsterType:${dumpsterType}`)}</Text>
                    <Text>
                        {t("visit:part1")} {visitors} {t("visit:part2")}
                    </Text>
                </View>
            </Callout>
        </Marker>
    );
}
