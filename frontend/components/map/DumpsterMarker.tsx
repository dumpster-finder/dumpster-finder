import React from "react";
import { Callout, Marker } from "react-native-maps";
import Dumpster from "../../models/Dumpster";
import { View, TextStyle } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
const lockedIcon = require("../../assets/images/dumpster-marker-locked.png");
const unlockedIcon = require("../../assets/images/dumpster-marker-unlocked.png");

/**
 * Displays a dumpster as a marker on a map
 * Used in the map view
 *
 * @param dumpster The dumpster to display
 * @param onPress  What should happen when the callout/marker is tapped
 */
export default function ({
    dumpster: { name, storeType, dumpsterType, position, visits, locked },
    onPress,
}: {
    dumpster: Dumpster;
    onPress: () => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const theme = useTheme();
    const textStyle: TextStyle = { color: theme["color-basic-800"] };
    return (
        <Marker
            coordinate={position}
            image={locked ? lockedIcon : unlockedIcon}
        >
            <Callout
                onPress={onPress}
                style={{
                    backgroundColor: theme["background-basic-color"],
                }}
            >
                <View>
                    <Text style={textStyle} category="h4">
                        {name}
                    </Text>
                    <Text style={textStyle}>{t(`storeType:${storeType}`)}</Text>
                    <Text style={textStyle}>
                        {t(`dumpsterType:${dumpsterType}`)}
                    </Text>
                    <Text style={textStyle}>
                        {t("visit:part1")} {visits} {t("visit:part2")}
                    </Text>
                </View>
            </Callout>
        </Marker>
    );
}
