import * as React from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { LockIcon, PositiveIcon, StarIcon, TrashIcon } from "./Icons";

export default function IconExplanation() {
    return (
        <View>
            <Text category={"h5"}>Icon explanation:</Text>
            <View style={{ paddingVertical: 10 }}>
                <View style={styles.row}>
                    <StarIcon size="medium" />
                    <Text style={styles.textPart}>Rating for dumpster</Text>
                </View>
                <View style={styles.row}>
                    <LockIcon size="medium" />
                    <Text style={styles.textPart}>Is the dumpster locked</Text>
                </View>
                <View style={styles.row}>
                    <TrashIcon size="medium" />
                    <Text style={styles.textPart}>
                        Emptying schedule for dumpster
                    </Text>
                </View>
                <View style={styles.row}>
                    <PositiveIcon size="medium" />
                    <Text style={styles.textPart}>
                        Stores view on dumpster diving
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    textPart: {
        paddingLeft: 5,
    },
});
