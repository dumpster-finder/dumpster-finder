import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "@ui-kitten/components";
import {
    BrushIcon,
    LockIcon,
    NegativeIcon,
    OpenLockIcon,
    PositiveIcon,
    StarIcon,
    TrashIcon,
} from "./Icons";
import Dumpster from "../models/Dumpster";

export default function DumpsterInfo({ dumpster }: { dumpster: Dumpster }) {
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <View style={styles.box}>
                {typeof dumpster.rating === "undefined" ? null : (
                    <View style={styles.boxRow}>
                        <StarIcon size="small" />
                        <Text style={styles.infoText}>
                            Rating: {dumpster.rating.toFixed(1)}
                        </Text>
                    </View>
                )}

                <View style={styles.boxRow}>
                    <BrushIcon size="small" />
                    <Text style={styles.infoText}>
                        Cleanliness: {dumpster.cleanliness}
                    </Text>
                </View>
                <View style={styles.boxRow}>
                    {dumpster.locked ? (
                        <>
                            <LockIcon size="small" />
                            <Text style={styles.infoText}>Locked</Text>
                        </>
                    ) : (
                        <>
                            <OpenLockIcon size="small" />
                            <Text style={styles.infoText}>Unlocked</Text>
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
            <View style={styles.infoRow}>
                <Text>Dumpster type: {dumpster.dumpsterType}</Text>
            </View>
            <View style={styles.infoBox}>
                <Divider />
                <Text style={{ paddingVertical: 2 }}>{dumpster.info}</Text>
                <Divider />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoText: {
        paddingLeft: 3,
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
    box: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: 5,
    },
    boxRow: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    infoBox: {
        paddingVertical: 5,
    },
});
