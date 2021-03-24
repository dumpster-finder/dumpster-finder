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
import { ArrowDownIcon, ArrowUpIcon, TrashIcon, XIcon } from "./Icons";
import Content from "../models/Content";
import { useState } from "react";

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
    return (
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
                    <Text
                        category={"h6"}
                        style={{ alignSelf: "center", paddingHorizontal: 5 }}
                    >
                        Amount:
                    </Text>

                    <Input
                        style={styles.input}
                        size={"large"}
                        value={editVal.toString()}
                        onChangeText={change => setEditVal(change)}
                    />
                </View>
                <Button onPress={save}>Save changes</Button>
                <Button
                    status={"danger"}
                    style={{ marginVertical: 10 }}
                    size={"small"}
                    onPress={del}
                >
                    Delete
                </Button>
            </Card>
        </Modal>
    );
    function save() {
        setVisible(false);
        onSave(parseInt(editVal));
    }

    function del() {
        setVisible(false);
        onDelete();
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
