import * as React from "react";
import Dumpster from "../models/Dumpster";
import DropdownCard from "./DropdownCard";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import {
    BrushIcon,
    LockIcon,
    NegativeIcon,
    OpenLockIcon,
    PositiveIcon,
    StarIcon,
    TrashIcon,
} from "./Icons";

export default function DumpsterDropdownCard({
    text,
    dumpster,
    onReset,
}: {
    text: string;
    dumpster: Dumpster;
    onReset: (newValue: Dumpster) => void;
}) {
    const [showView, setShowView] = useState(false);
    return (
        <View>
            <DropdownCard value={showView} text={text} onClick={setShowView} />
            {showView && (
                <View style={styles.infoView}>
                    <Text style={{ alignSelf: "center" }}>{dumpster.name}</Text>
                    <View style={styles.infoRow}>
                        <Text>Store type: {dumpster.storeType}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text>Dumpster type: {dumpster.dumpsterType}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.threeRowStart}>
                            <StarIcon size="small" />
                            <Text style={styles.infoText}>
                                Rating: {dumpster.rating.toFixed(1)}
                            </Text>
                        </View>
                        <View style={styles.threeRowCenter}>
                            <BrushIcon size="small" />
                            <Text style={styles.infoText}>
                                Cleanliness: {dumpster.cleanliness}
                            </Text>
                        </View>
                        <View style={styles.threeRowEnd}>
                            {dumpster.locked ? (
                                <>
                                    <LockIcon size="small" />
                                    <Text style={styles.infoText}>Locked</Text>
                                </>
                            ) : (
                                <>
                                    <OpenLockIcon size="small" />
                                    <Text style={styles.infoText}>
                                        Unlocked
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <TrashIcon size="small" />
                        <Text style={styles.infoText}>
                            Emptying schedule: {dumpster.emptyingSchedule}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        {dumpster.positiveStoreViewOnDiving ? (
                            <PositiveIcon size="small" />
                        ) : dumpster.positiveStoreViewOnDiving === null ? (
                            <PositiveIcon size="small" /> // TODO decide what icon to have here...
                        ) : (
                            <NegativeIcon size={"small"} />
                        )}
                        <Text style={styles.infoText}>
                            Store's view on dumpster diving:{" "}
                            {dumpster.positiveStoreViewOnDiving ? (
                                <Text>Positive</Text>
                            ) : dumpster.positiveStoreViewOnDiving === null ? (
                                <Text>Neutral</Text>
                            ) : (
                                <Text>Negative</Text>
                            )}
                        </Text>
                    </View>
                    <Button
                        style={{ width: "50%", alignSelf: "center" }}
                        size={"small"}
                        onPress={() => onReset(dumpster)}
                    >
                        Reset to this dumpster
                    </Button>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    view: {
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    rowThird: {
        flex: 1,
        flexDirection: "row",
        width: "33.3%",
    },
    infoText: {
        paddingLeft: 3,
    },
    threeRowStart: {
        flex: 1,
        flexDirection: "row",
        width: "33.3%",
        justifyContent: "flex-start",
    },

    threeRowCenter: {
        flex: 1,
        flexDirection: "row",
        width: "33.3%",
        justifyContent: "center",
    },
    threeRowEnd: {
        flex: 1,
        flexDirection: "row",
        width: "33.3%",
        justifyContent: "flex-end",
    },
    infoView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    infoRow: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
    },
});
