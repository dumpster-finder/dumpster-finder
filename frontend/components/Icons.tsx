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

export const StarIcon = (props: IconProps) => (
    <BaseIcon {...props} name="star" />
);

export const PlusIcon = (props: IconProps) => (
    <BaseIcon {...props} name="plus-outline" />
);

export const FilterIcon = (props: IconProps) => (
    <BaseIcon {...props} name="funnel" />
);

export const SearchIcon = (props: IconProps) => (
    <BaseIcon {...props} name="search" />
);

export const FlagIcon = (props: IconProps) => (
    <BaseIcon {...props} name="flag" />
);

export const EditIcon = (props: IconProps) => (
    <BaseIcon {...props} name="edit-2" />
);

export const ArrowLeftIcon = (props: IconProps) => (
    <BaseIcon {...props} name="arrow-ios-back" />
);

export const ArrowRightIcon = (props: IconProps) => (
    <BaseIcon {...props} name="arrow-ios-forward" />
);



const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32
    }
})
