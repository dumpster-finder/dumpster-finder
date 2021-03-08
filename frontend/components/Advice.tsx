import * as React from "react";
import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

export default function Advice() {
    return (
        <View>
            <Text category={"h5"}>Dumpster diving advice: </Text>
            <View style={{ paddingVertical: 10 }}>
                <Text style={styles.text}>
                    1. Don’t go diving in locked dumpsters
                </Text>
                <Text style={styles.text}>
                    2. Don’t go in dumpsters marked private
                </Text>
                <Text style={styles.text}>
                    3. Don’t go dumpster diving alone
                </Text>
                <Text style={styles.text}>4. Dress accordingly</Text>
                <Text style={styles.text}>5. Clean up after yourself</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
});
