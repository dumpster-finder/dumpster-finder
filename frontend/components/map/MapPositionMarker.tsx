import React from "react";
import { Callout, Marker } from "react-native-maps";
import Position from "../../models/Position";
import { useTranslation } from "react-i18next";
import { Text, useTheme } from "@ui-kitten/components";
import { TextStyle, View } from "react-native";
const icon = require("../../assets/images/user-marker.png");

export interface MarkerProps {
    position: Position;
}

/**
 * Marks your position
 *
 * @param position The position the user has set
 */
export default function({ position }: MarkerProps) {
    const { t }: { t: (s: string) => string } = useTranslation();
    const theme = useTheme();
    const textStyle: TextStyle = {
        color: theme["color-basic-800"],
        textAlign: "center",
    };
    return (
        <Marker coordinate={position} image={icon}>
            <Callout>
                <View>
                    <Text category="h4" style={textStyle}>
                        {t("yourPosition")}
                    </Text>
                    <Text style={textStyle}>
                        {"("}
                        {position.latitude.toFixed(4)}
                        {", "}
                        {position.longitude.toFixed(4)}
                        {")"}
                    </Text>
                </View>
            </Callout>
        </Marker>
    );
}
