import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    StarIcon,
    LockIcon,
    TrashIcon,
    PositiveIcon,
} from "../components/Icons";
import { Layout, Text } from "@ui-kitten/components";

export default function InfoScreen() {
    return (
        <Layout style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{ padding: 10 }}>
                    <Text category={"h5"}>Icon explanation:</Text>
                    <View style={{ paddingVertical: 10 }}>
                        <View style={styles.row}>
                            <StarIcon size="medium" />
                            <Text style={styles.textPart}>
                                Rating for dumpster
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <LockIcon size="medium" />
                            <Text style={styles.textPart}>
                                Is the dumpster locked
                            </Text>
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

                    <Text category={"h5"}>Dumpster diving advice: </Text>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.text}>1. Don’t go diving in locked dumpsters</Text>
                        <Text style={styles.text}>2. Don’t go in dumpsters marked private</Text>
                        <Text style={styles.text}>3. Don’t go dumpster diving alone</Text>
                        <Text style={styles.text}>4. Dress accordingly</Text>
                        <Text style={styles.text}>5. Clean up after yourself</Text>
                    </View>
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
        width: "100%",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    title: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 15,
    },
    text: {
        paddingVertical: 5,
        paddingHorizontal: 5
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
