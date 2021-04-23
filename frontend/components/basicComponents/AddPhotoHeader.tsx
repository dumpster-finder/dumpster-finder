import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as React from "react";
import { Button } from "@ui-kitten/components";
import { PlusIcon } from "./Icons";

export default function({}: { tintColor?: string }) {
    const navigation = useNavigation();
    const { t }: { t: (s: string) => string } = useTranslation("menu");

    return (
        <Button
            appearance="ghost"
            size={"medium"}
            accessoryLeft={PlusIcon}
            onPress={() => navigation.navigate("AddPhotoScreen")}
        />
    );
}
