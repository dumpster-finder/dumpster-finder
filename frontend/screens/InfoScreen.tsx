import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Icon, Text } from "react-native-elements";

export default function InfoScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Text h1 style={{ alignSelf: "center" }}>
                    Info
                </Text>
                <View
                    style={{
                        height: "100%",
                        width: 400,
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "column",
                    }}>
                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <View style={{ width: "20%", height: "100%" }}>
                            <Icon name="star" color="#FFD100" />
                        </View>
                        <View style={{ width: "80%", height: "100%" }}>
                            <Text>Rating for dumpster</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <View style={{ width: "20%", height: "100%" }}>
                            <Icon
                                name="lock"
                                type="font-awesome"
                                color="#FF0000"
                            />
                        </View>
                        <View style={{ width: "80%", height: "100%" }}>
                            <Text>The dumpster is locked</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <View style={{ width: "20%", height: "100%" }}>
                            <Icon
                                name="unlock"
                                type="font-awesome"
                                color="#54C500"
                            />
                        </View>
                        <View style={{ width: "80%", height: "100%" }}>
                            <Text>The dumpster is open</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <View style={{ width: "20%", height: "100%" }}>
                            <Icon name="edit" type="font-awesome" />
                        </View>
                        <View style={{ width: "80%", height: "100%" }}>
                            <Text>Edit the dumpster</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <View style={{ width: "20%", height: "100%" }}>
                            <Icon name="delete" />
                        </View>
                        <View style={{ width: "80%", height: "100%" }}>
                            <Text>When the dumpster is emptied </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <View style={{ width: "20%", height: "100%" }}>
                            <Icon name="thumbs-up" type="font-awesome" />
                        </View>
                        <View style={{ width: "80%", height: "100%" }}>
                            <Text>The shop’s view on dumpster diving </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            height: "50%",
                            width: 400,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text h3>Dumpster diving advice:</Text>
                        <Text>1. Don’t go diving in locked dumpsters</Text>
                        <Text>2. Don’t go in dumpsters makred private</Text>
                        <Text>3. Don’t go dumpster diving alone</Text>
                        <Text>4. Dress accordingly</Text>
                    </View>
                </View>
            </View>
            {/*<EditScreenInfo path="/screens/InfoScreen.tsx" />*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
