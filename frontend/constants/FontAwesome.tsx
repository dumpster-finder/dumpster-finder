import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconProps} from "@ui-kitten/components";

/**
 * Font Awesome icon pack
 *
 * Make an icon like this:
 * ```jsx
 * <Icon name="thumbs-up" pack="font-awesome" />
 * ```
 * (preferably as a new *specific* icon component in `Icons.tsx`)
 *
 * This file is written almost exactly like this example:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages#multiple-icon-packages
 */
export const FontAwesomePack = {
    name: 'font-awesome',
    icons: createIconsMap(),
};

function createIconsMap() {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name);
        },
    });
}

const IconProvider = (name: PropertyKey) => ({
    toReactElement: (props: IconProps) => FontAwesomeIcon({ name, ...props }),
});

function FontAwesomeIcon({ name, style }: { name: string, style: any }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
        <Icon name={name} size={height} color={tintColor} style={iconStyle} />
    );
}
