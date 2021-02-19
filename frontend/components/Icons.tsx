import React from "react";
import { Icon, IconProps } from "@ui-kitten/components";
import { withStyles } from '@ui-kitten/components';
import {StyleSheet} from "react-native";

const UnthemedIcon = (props: IconProps) => {
    const { eva, style, ...restProps } = props;
    return (
        <Icon {...restProps} fill={eva.style.icon.color} style={[eva.style.icon, style, styles.icon]} />
    );
};

export const BaseIcon = withStyles(UnthemedIcon, (theme) => {
    return {
        icon: {
            color: theme['color-basic-900'],
        },
    }
});


export const LockIcon = (props: IconProps) => (
    <BaseIcon {...props} name="lock" />
);

export const TrashIcon = (props: IconProps) => (
    <BaseIcon {...props} name="trash" />
);

export const NegativeIcon = (props: IconProps) => (
    <BaseIcon {...props} name="trash" />
);

export const PositiveIcon = (props: IconProps) => (
    <BaseIcon {...props} name="star" />
);

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32
    }
})
