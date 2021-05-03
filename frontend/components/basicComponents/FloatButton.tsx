import * as React from "react";
import { PlusIcon } from "./Icons";
import { Pressable, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

export default function FloatButton({ onPress }: { onPress: () => void }) {
    const theme = useTheme();
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 14,
                right: 14,
                padding: 5,
                backgroundColor: theme["color-warning-default"],
                elevation: 10,
                borderRadius: 25,
                width: 48,
                height: 48,
            }}
        >
            <Pressable onPress={onPress}>
                <PlusIcon size="large" color="white" />
            </Pressable>
        </View>
    );
}
