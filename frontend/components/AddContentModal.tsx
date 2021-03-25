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
import { useState } from "react";

export default function AddContentModal({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
}) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card style={{ alignItems: "center" }}>
                <Text category={"h5"}>Add content</Text>
                <Divider />
                <Input
                    style={styles.input}
                    label={"Product"}
                    placeholder={"Product name"}
                    value={name}
                    onChangeText={change => setName(change)}
                />

                <View style={styles.row}>
                    <Input
                        style={styles.smallInput}
                        label={"Amount"}
                        keyboardType={"number-pad"}
                        placeholder={"0"}
                        value={amount}
                        onChangeText={change => setAmount(change)}
                    />
                    <View style={{ width: "9%" }} />
                    <Input
                        style={styles.smallInput}
                        label={"Unit"}
                        placeholder={"Unit"}
                        value={unit}
                        onChangeText={change => setUnit(change)}
                    />
                </View>
                <Input
                    style={styles.input}
                    label={"Expires on"}
                    placeholder={"12-04-21"}
                    value={expiryDate}
                    onChangeText={change => setExpiryDate(change)}
                />
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
        paddingTop: 5,
        maxWidth: "80%",
        minWidth: "80%",
    },
    smallInput: {
        maxWidth: "40%",
        minWidth: "40%",
    },
});
