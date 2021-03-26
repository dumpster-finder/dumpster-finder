import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout } from "@ui-kitten/components";
import IconExplanation from "../components/IconExplanation";
import Advice from "../components/Advice";

export default function InfoScreen() {
    return (
        <Layout style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.innerContainer}
            >
                <View style={{ paddingHorizontal: 10 }}>
                    <IconExplanation />
                    <Advice />
                </View>
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
    },
    innerContainer: {
        marginVertical: "15%",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    title: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 15,
    },
    text: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    box: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    iconPart: {
        width: "20%",
        height: "100%",
        alignItems: "flex-end",
    },
    textPart: {
        paddingLeft: 5,
    },
});
