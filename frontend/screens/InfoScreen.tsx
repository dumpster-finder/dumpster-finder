import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { Icon } from "react-native-elements";
import { Layout, Text } from "@ui-kitten/components";

export default function InfoScreen() {
    return (
        <Layout style={styles.container}>
            <Text category="h1" style={styles.title}>
                Info
            </Text>
            <View style={styles.box}>
                <View style={styles.iconPart}>
                    <Icon name="star" color="#FFD100" />
                </View>
                <View style={styles.textPart}>
                    <Text>Rating for dumpster</Text>
                </View>
            </View>

            <View style={styles.box}>
                <View style={styles.iconPart}>
                    <Icon name="lock" type="font-awesome" color="#FF0000" />
                </View>
                <View style={styles.textPart}>
                    <Text>The dumpster is locked</Text>
                </View>
            </View>

            <View style={styles.box}>
                <View style={styles.iconPart}>
                    <Icon name="unlock" type="font-awesome" color="#54C500" />
                </View>
                <View style={styles.textPart}>
                    <Text>The dumpster is open</Text>
                </View>
            </View>

            <View style={styles.box}>
                <View style={styles.iconPart}>
                    <Icon name="edit" type="font-awesome" />
                </View>
                <View style={styles.textPart}>
                    <Text>Edit the dumpster</Text>
                </View>
            </View>

            <View style={styles.box}>
                <View style={styles.iconPart}>
                    <Icon name="delete" />
                </View>
                <View style={styles.textPart}>
                    <Text>When the dumpster is emptied </Text>
                </View>
            </View>

            <View style={styles.box}>
                <View style={styles.iconPart}>
                    <Icon name="thumbs-up" type="font-awesome" />
                </View>
                <View style={styles.textPart}>
                    <Text>The shop’s view on dumpster diving </Text>
                </View>
            </View>

            <View
                style={{
                    height: "50%",
                    width: 400,
                }}
            >
                <Text category="h3" style={styles.title}>
                    Dumpster diving advice:
                </Text>
                <View style={{ marginLeft: 40 }}>
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
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width: 400,
        flexDirection: "column",
    },
    title: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 15,
    },
    text: {
        margin: 4,
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
    },
    textPart: {
        width: "80%",
        height: "100%",
    },
});
