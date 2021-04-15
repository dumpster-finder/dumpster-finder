import React from "react";
import { Icon, IconProps as BaseIconProps } from "@ui-kitten/components";
import { withStyles } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

type IconProps = BaseIconProps & {
    faded?: boolean;
    color?: "red" | "green" | "yellow" | "faded";
    size?: "small" | "medium" | "large";
};

export const UnthemedIcon = ({
    eva,
    style,
    color,
    size,
    ...restProps
}: IconProps) => {
    const fill = color ? eva.style[color].color : eva.style.icon.color;
    return (
        <View style={styles.wrapper}>
            <Icon
                {...restProps}
                fill={fill}
                style={[eva.style.icon, size && styles[size], style]}
            />
        </View>
    );
};

export const BaseIcon = withStyles(UnthemedIcon, theme => {
    return {
        icon: {
            color: theme["text-basic-color"],
        },
        faded: {
            color: theme["text-disabled-color"],
        },
        red: {
            color: theme["color-danger-default"],
        },
        green: {
            color: theme["color-success-active"],
        },
        yellow: {
            color: theme["color-warning-default"],
        },
    };
});

/* These icons should be styled exclusively by the Kitten component they're put inside */

export const SaveButtonIcon = (props: IconProps) => (
    <Icon {...props} name="save" />
);

export const CommentButtonIcon = (props: IconProps) => (
    <Icon {...props} name="message-square" />
);

export const PendingButtonIcon = (props: IconProps) => (
    <Icon {...props} name="loader-outline" animation="pulse" />
);

export const DeleteButtonIcon = (props: IconProps) => (
    <Icon {...props} name="trash" />
);

export const TrashInputIcon = (props: IconProps) => (
    <Icon {...props} name="trash" />
);

export const SearchInputIcon = (props: IconProps) => (
    <Icon {...props} name="search" />
);

/* These should not */

export const RefreshIcon = (props: IconProps) => (
    <BaseIcon {...props} name="refresh" />
);

export const LockIcon = (props: IconProps) => (
    <BaseIcon {...props} pack="font-awesome" name="lock" />
);

export const OpenLockIcon = (props: IconProps) => (
    <BaseIcon {...props} pack="font-awesome" name="unlock" />
);

export const TrashIcon = (props: IconProps) => (
    <BaseIcon {...props} name="trash" />
);

export const NegativeIcon = (props: IconProps) => (
    <BaseIcon {...props} pack="font-awesome" name="thumbs-down" />
);

export const PositiveIcon = (props: IconProps) => (
    <BaseIcon {...props} pack="font-awesome" name="thumbs-up" />
);

export const CleanIcon = (props: IconProps) => (
    <BaseIcon {...props} color="green" name="brush" /> // TODO pack="font-awesome-5" name="broom" DOES NOT GET FADED AAAAAA
);

export const FadedCleanIcon = (props: IconProps) => (
    <BaseIcon {...props} color="faded" name="brush" />
);

export const StarIcon = (props: IconProps) => (
    <BaseIcon {...props} color="yellow" name="star" />
);

export const PlusIcon = (props: IconProps) => (
    <BaseIcon {...props} name="plus-outline" />
);

export const FilterIcon = (props: IconProps) => (
    <BaseIcon {...props} name="funnel" />
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
    <BaseIcon {...props} color="green" name="brush" />
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
    wrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
});
