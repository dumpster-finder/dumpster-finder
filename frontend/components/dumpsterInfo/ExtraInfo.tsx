import Dumpster from "../../models/Dumpster";
import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet } from "react-native";

/**
 * Displays the additional information a user can add about a dumpster.
 * @param dumpster
 *
 */
export default function ExtraInfo({ dumpster }: { dumpster: Dumpster }) {
    if (!dumpster.info) return null;

    return (
        <Layout level="2" style={styles.infoBox}>
            <Text style={styles.infoText}>{dumpster.info}</Text>
        </Layout>
    );
}

const styles = StyleSheet.create({
    infoBox: {
        marginVertical: 5,
        paddingVertical: 3,
        paddingHorizontal: 9,
        borderRadius: 15,
    },
    infoText: {
        marginVertical: 2,
        flexShrink: 1,
    },
});
