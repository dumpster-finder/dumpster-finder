import * as React from "react";
import {
    Button,
    Card,
    Divider,
    Input,
    Modal,
    Text,
} from "@ui-kitten/components";
import Content from "../models/Content";
import { StyleSheet, View } from "react-native";

export default function AddContentModal({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
}) {
    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card style={{ alignItems: "center" }}>
                <Text>Add content</Text>
                <Divider />
                <Input style={styles.input} label={"Product"} />

                <View style={styles.row}>
                    <Input
                        style={{ maxWidth: "40%", minWidth: "40%" }}
                        label={"Amount"}
                        keyboardType={"number-pad"}
                    />
                    <View style={{ width: "9%" }} />
                    <Input
                        style={{
                            maxWidth: "40%",
                            minWidth: "40%",
                        }}
                        label={"Unit"}
                    />
                </View>
                <Input style={styles.input} label={"Expires on"} />
                <View style={styles.row}>
                    <Button style={{ marginHorizontal: 5 }} onPress={add}>
                        Add
                    </Button>
                    <Button
                        style={{ marginHorizontal: 5 }}
                        status={"basic"}
                        onPress={() => setVisible(false)}
                    >
                        Cancel
                    </Button>
                </View>
            </Card>
        </Modal>
    );

    function add() {
        console.log("do stuff");
    }
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 2,
    },
    input: {
        maxWidth: "80%",
        minWidth: "80%",
    },
});
