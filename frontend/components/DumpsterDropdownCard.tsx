import * as React from "react";
import { RevDumpster } from "../models/Dumpster";
import DropdownCard from "./DropdownCard";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import DumpsterInfo from "./DumpsterInfo";
import { useTranslation } from "react-i18next";

export default function DumpsterDropdownCard({
    text,
    dumpster,
    onReset,
}: {
    text: string;
    dumpster: RevDumpster;
    onReset: (newValue: RevDumpster) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("revision");
    const [showView, setShowView] = useState(false);
    return (
        <View>
            <DropdownCard value={showView} text={text} onClick={setShowView} />
            {showView && (
                <View style={styles.infoView}>
                    <Text category={"h5"} style={{ alignSelf: "center" }}>
                        {dumpster.name}
                    </Text>
                    <Text category={"h6"} style={{ alignSelf: "center" }}>
                        {t(`dumpsterType:${dumpster.dumpsterType}`)}
                        {" – "}
                        {t(`storeType:${dumpster.storeType}`)}
                    </Text>
                    <DumpsterInfo dumpster={dumpster} />
                    <Button
                        style={{ minWidth: "50%", alignSelf: "center" }}
                        size={"small"}
                        onPress={() => onReset(dumpster)}
                        disabled={dumpster.isActive}
                    >
                        {t("revert")}
                    </Button>
                    {dumpster.isActive && (
                        <Text style={{ alignSelf: "center" }}>
                            {t("current")}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    infoView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});
