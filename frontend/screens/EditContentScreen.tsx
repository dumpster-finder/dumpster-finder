import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export default function EditContentScreen() {
    return (
        <Layout style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text>Contents</Text>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "auto",
        marginVertical: "15%",
    },
});
