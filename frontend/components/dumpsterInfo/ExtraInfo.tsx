import Dumpster from "../../models/Dumpster";
import { Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet } from "react-native";

export default function ExtraInfo({ dumpster }: { dumpster: Dumpster }) {
    return (
        <Layout level="2" style={styles.infoBox}>
            <Text style={{ marginVertical: 2 }}>{dumpster.info}</Text>
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
});
