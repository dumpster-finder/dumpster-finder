import * as React from "react";
import Burgermenu from "./Burgermenu";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function({}: { tintColor?: string }) {
    const navigation = useNavigation();
    const { t }: { t: (s: string) => string } = useTranslation("menu");

    return (
        <Burgermenu
            onSelect={menuSelect}
            values={[
                t("flag"),
                t("revision"),
                t("editDumpster"),
                t("editContent"),
            ]}
        />
    );

    function menuSelect(menuIndex: number) {
        switch (menuIndex) {
            case 0:
                console.log("flag");
                break;
            case 1:
                navigation.navigate("RevisionScreen", {
                    screen: "RevisionScreen",
                });
                break;
            case 2:
                navigation.navigate("EditDumpsterScreen", {
                    screen: "EditDumpsterScreen",
                });
                break;
            case 3:
                navigation.navigate("EditContentScreen", {
                    screen: "EditContentScreen",
                });
                break;
            default:
                console.log(menuIndex);
                break;
        }
    }
}
