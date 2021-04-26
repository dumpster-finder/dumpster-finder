import * as React from "react";
import Burgermenu from "./Burgermenu";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
    EditButtonIcon,
    PhotoButtonIcon,
    ReportButtonIcon,
    RevisionButtonIcon,
} from "./Icons";

export default function({}: { tintColor?: string }) {
    const navigation = useNavigation();
    const { t }: { t: (s: string) => string } = useTranslation("menu");

    return (
        <Burgermenu
            onSelect={menuSelect}
            values={[t("gallery"), t("editDumpster"), t("revision"), t("flag")]}
            icons={[
                PhotoButtonIcon,
                EditButtonIcon,
                RevisionButtonIcon,
                ReportButtonIcon,
            ]}
        />
    );

    function menuSelect(menuIndex: number) {
        switch (menuIndex) {
            case 0:
                navigation.navigate("PhotoGalleryScreen");
                break;
            case 1:
                navigation.navigate("EditDumpsterScreen", {
                    screen: "EditDumpsterScreen",
                });
                break;
            case 2:
                navigation.navigate("RevisionScreen", {
                    screen: "RevisionScreen",
                });
                break;
            case 3:
                navigation.navigate("FlagScreen");
                break;
            default:
                console.log(menuIndex);
                break;
        }
    }
}
