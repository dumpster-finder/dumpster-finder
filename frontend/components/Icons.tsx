import React from "react";
import { Icon, IconProps as BaseIconProps } from "@ui-kitten/components";
import { withStyles } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type IconProps = BaseIconProps & {
    faded?: boolean;
    color?: "red" | "green" | "yellow" | "faded"
    size?: "small" | "medium" | "large";
};

export const UnthemedIcon = ({ eva, style, size, faded, ...restProps }: IconProps) => {
    const fill = faded ? eva.style.fadedIcon.color : eva.style.icon.color;
    return (
        <Icon
            {...restProps}
            fill={fill}
            style={[eva.style.icon, size && styles[size], style]}
        />
    );
};

export const BaseIcon = withStyles(UnthemedIcon, theme => {
    return {
        icon: {
            color: theme["text-basic-color"],
        },
        fadedIcon: {
            color: theme["text-disabled-color"],
        },
    };
});

export const RefreshIcon = (props: IconProps) => (
    <BaseIcon {...props} name="refresh" />
);

export const LockIcon = (props: IconProps) => (
    <BaseIcon {...props} name="lock" />
);

export const OpenLockIcon = (props: IconProps) => (
    <BaseIcon {...props} name="unlock" />
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
    <BaseIcon {...props} name="brush" />
);

export const FadedCleanIcon = (props: IconProps) => (
    <BaseIcon {...props} faded name="brush" />
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

export const ArrowDownIcon = (props: IconProps) => (
    <BaseIcon {...props} name="arrow-ios-downward" />
);

export const ArrowUpIcon = (props: IconProps) => (
    <BaseIcon {...props} name="arrow-ios-upward" />
);

export const RateUpIcon = (props: IconProps) => (
    <BaseIcon {...props} name="arrow-upward" />
);

export const RateDownIcon = (props: IconProps) => (
    <BaseIcon {...props} name="arrow-downward" />
);


export const BrushIcon = (props: IconProps) => (
    <BaseIcon {...props} name="brush" />
);

export const MessageIcon = (props: IconProps) => (
    <BaseIcon {...props} name="message-square" />
);

export const MenuIcon = (props: IconProps) => (
    <BaseIcon {...props} name="menu" />
);




const styles: Record<string, any> = StyleSheet.create({
    small: {
        width: 16,
        height: 16,
    },
    medium: {
        width: 24,
        height: 24,
    },
    large: {
        width: 32,
        height: 32,
    },
});
