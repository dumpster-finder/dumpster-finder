import * as React from "react";
import {
    Button,
    Card,
    Divider,
    Input,
    Modal,
    Text,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import Content from "../models/Content";
import { useState } from "react";
import { DeleteButtonIcon, SaveButtonIcon } from "./Icons";

export default function EditContentModal({
    visible,
    setVisible,
    selectedContent,
    onSave,
    onDelete,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
    selectedContent: Content;
    onSave: (newVal: number) => void;
    onDelete: () => void;
}) {
    const [editVal, setEditVal] = useState(selectedContent.amount.toString());
    const [delVis, setDelVis] = useState(false);
    return (
        <View>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
            >
                <Card
                    disabled={true}
                    style={{
                        alignItems: "center",
                    }}
                >
                    <Text category={"h5"} style={{ alignSelf: "center" }}>
                        {selectedContent.name}
                    </Text>
                    <Divider />

                    <View style={styles.row}>
                        <Input
                            label={"Amount"}
                            style={styles.input}
                            size={"large"}
                            value={editVal.toString()}
                            onChangeText={change => setEditVal(change)}
                            keyboardType={"number-pad"}
                        />
                        <Text
                            category={"h6"}
                            style={{
                                alignSelf: "center",
                                paddingHorizontal: 5,
                            }}
                        >
                            {selectedContent.unit}
                        </Text>
                    </View>

                    {selectedContent.expiryDate && (
                        <Text category={"h6"}>
                            Expires on:{" "}
                            {selectedContent.expiryDate.toDateString()}
                        </Text>
                    )}
                    <Button onPress={save} accessoryLeft={SaveButtonIcon}>
                        Save changes
                    </Button>
                    <Button
                        status={"danger"}
                        style={{ marginVertical: 10 }}
                        size={"small"}
                        onPress={deleteCheck}
                        accessoryLeft={DeleteButtonIcon}
                    >
                        Delete
                    </Button>
                    <Button onPress={() => setVisible(false)} status={"basic"}>
                        Cancel
                    </Button>
                </Card>
            </Modal>
            <Modal visible={delVis} backdropStyle={styles.backdrop}>
                <Card
                    disabled={true}
                    style={{
                        alignItems: "center",
                    }}
                >
                    <Text>Are you sure?</Text>
                    <Divider />
                    <View style={styles.row}>
                        <Button
                            style={{ marginHorizontal: 5 }}
                            onPress={del}
                            status={"danger"}
                        >
                            Yes
                        </Button>
                        <Button
                            style={{ marginHorizontal: 5 }}
                            onPress={() => setDelVis(false)}
                            status={"basic"}
                        >
                            Cancel
                        </Button>
                    </View>
                </Card>
            </Modal>
        </View>
    );
    function save() {
        setVisible(false);
        onSave(parseInt(editVal));
    }

    function del() {
        setDelVis(false);
        setVisible(false);
        onDelete();
    }

    function deleteCheck() {
        setDelVis(true);

        console.log(delVis);
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 2,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    input: {
        alignSelf: "center",
        maxWidth: "40%",
        minWidth: "40%",
    },
});
