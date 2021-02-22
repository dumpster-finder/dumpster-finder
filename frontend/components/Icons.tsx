import React from "react";
import { Icon, IconProps as BaseIconProps } from "@ui-kitten/components";
import { withStyles } from '@ui-kitten/components';
import {StyleSheet} from "react-native";

type IconProps = BaseIconProps & { faded?: boolean };

const UnthemedIcon = (props: IconProps) => {
    const { eva, style, faded, ...restProps } = props;
    const fill = faded ? eva.style.fadedIcon.color : eva.style.icon.color;
    return (
        <Icon {...restProps} fill={fill} style={[eva.style.icon, styles.icon, style]} />
    );
};

export const BaseIcon = withStyles(UnthemedIcon, (theme) => {
    return {
        icon: {
            color: theme['text-basic-color'],
        },
        fadedIcon: {
            color: theme['text-disabled-color'],
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

export const CleanIcon = (props: IconProps) => (
    <BaseIcon {...props} name="star" />
);

export const FadedCleanIcon = (props: IconProps) => (
    <BaseIcon {...props} faded name="star" />
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
