import * as React from "react";
import {
    Button,
    Card,
    Datepicker,
    Divider,
    Input,
    Modal,
    Text,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AddContentModal({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("content");

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [expiryDate, setExpiryDate] = useState(new Date());
    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card style={{ alignItems: "center" }}>
                <Text category={"h5"}>{t("title")}</Text>
                <Divider />
                <Input
                    style={styles.input}
                    label={t("product")}
                    placeholder={t("productPlace")}
                    value={name}
                    onChangeText={change => setName(change)}
                />

                <View style={styles.row}>
                    <Input
                        style={styles.smallInput}
                        label={t("amount")}
                        keyboardType={"number-pad"}
                        placeholder={"0"}
                        value={amount}
                        onChangeText={change => setAmount(change)}
                    />
                    <View style={{ width: "9%" }} />
                    <Input
                        style={styles.smallInput}
                        label={t("unit")}
                        placeholder={t("unit")}
                        value={unit}
                        onChangeText={change => setUnit(change)}
                    />
                </View>
                <Datepicker
                    style={styles.input}
                    label={t("expiryDate")}
                    placeholder={t("expiryPlace")}
                    date={expiryDate}
                    onSelect={change => setExpiryDate(change)}
                />
                <View style={styles.row}>
                    <Button style={{ marginHorizontal: 5 }} onPress={add}>
                        {t("add")}
                    </Button>
                    <Button
                        style={{ marginHorizontal: 5 }}
                        status={"basic"}
                        onPress={() => setVisible(false)}
                    >
                        {t("cancel")}
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
