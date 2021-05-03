import * as React from "react";
import { Text } from "@ui-kitten/components";
import { PlusIcon } from "./Icons";
import { TouchableOpacity, View } from "react-native";

export default function FloatButton({ onPress }: { onPress: () => void }) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 10,
                right: 10,
                padding: 5,
                backgroundColor: "lightseagreen",
                borderRadius: 25,
            }}
        >
            <TouchableOpacity onPress={onPress}>
                <PlusIcon size="large" />
            </TouchableOpacity>
        </View>
    );
}
