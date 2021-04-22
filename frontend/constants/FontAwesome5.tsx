import React from "react";
import { StyleSheet } from "react-native";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome5";
import { IconProps } from "@ui-kitten/components";

/**
 * Font Awesome 5 icon pack
 *
 * Make an icon like this:
 * ```jsx
 * <Icon name="thumbs-up" pack="font-awesome-5" />
 * ```
 * (preferably as a new *specific* icon component in `Icons.tsx`)
 *
 * This file is written almost exactly like this example:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages#multiple-icon-packages
 */
export const FontAwesome5Pack = {
    name: "font-awesome-5",
    icons: createIconsMap(),
};

function createIconsMap() {
    return new Proxy(
        {},
        {
            get(target, name) {
                return IconProvider(name);
            },
        },
    );
}

const IconProvider = (name: PropertyKey) => ({
    toReactElement: (props: IconProps) => FontAwesome5Icon({ name, ...props }),
});

function FontAwesome5Icon({ name, style }: { name: string; style: any }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
        <Icon name={name} size={height} color={tintColor} style={iconStyle} />
    );
}
