import * as React from "react";
import { RevDumpster } from "../models/Dumpster";
import DropdownCard from "./DropdownCard";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import DumpsterInfo from "./DumpsterInfo";

export default function DumpsterDropdownCard({
    text,
    dumpster,
    onReset,
}: {
    text: string;
    dumpster: RevDumpster;
    onReset: (newValue: RevDumpster) => void;
}) {
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
                        {dumpster.storeType}
                    </Text>
                    <DumpsterInfo dumpster={dumpster} />
                    <Button
                        style={{ width: "50%", alignSelf: "center" }}
                        size={"small"}
                        onPress={() => onReset(dumpster)}
                        disabled={dumpster.isActive}
                    >
                        Revert to this revision
                    </Button>
                    {dumpster.isActive ? (
                        <Text style={{ alignSelf: "center" }}>
                            This is the current revision
                        </Text>
                    ) : null}
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
