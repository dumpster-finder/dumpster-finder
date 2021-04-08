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
import { DeleteButtonIcon, PendingButtonIcon, SaveButtonIcon } from "./Icons";
import { formatDate } from "../utils/date";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function EditContentModal({
    visible,
    setVisible,
    pending,
    selectedContent,
    onSave,
    onDelete,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
    pending: boolean;
    selectedContent: Content;
    onSave: (content: Content) => void;
    onDelete: (content: Content) => void;
}) {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const { t }: { t: (s: string) => string } = useTranslation(
        "contentsEditor",
    );
    return (
        <View>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
            >
                <Formik
                    initialValues={{
                        amount: selectedContent.amount
                            ? selectedContent.amount.toString()
                            : "",
                    }}
                    validationSchema={Yup.object().shape({
                        amount: Yup.number(),
                    })}
                    onSubmit={save}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <Card
                            disabled={true}
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Text
                                category={"h5"}
                                style={{ alignSelf: "center" }}
                            >
                                {selectedContent.name}
                            </Text>
                            <Divider />

                            <View style={styles.row}>
                                <Input
                                    label={t("amount.label")}
                                    style={styles.input}
                                    size={"large"}
                                    value={values.amount}
                                    onChangeText={handleChange("amount")}
                                    keyboardType={"number-pad"}
                                    status={errors.amount && "danger"}
                                    caption={
                                        errors.amount &&
                                        t("amount.errorInvalid")
                                    }
                                />
                                <Text
                                    category={"h6"}
                                    style={{
                                        alignSelf: "center",
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    {selectedContent.unit || ""}
                                </Text>
                            </View>

                            {selectedContent.expiryDate && (
                                <Text category={"h6"}>
                                    {t("expiresOn")}{" "}
                                    {formatDate(selectedContent.expiryDate)}
                                </Text>
                            )}
                            <Button
                                disabled={pending}
                                accessoryLeft={
                                    pending ? PendingButtonIcon : SaveButtonIcon
                                }
                                onPress={_ => handleSubmit()}
                            >
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
                            <Button
                                onPress={() => setVisible(false)}
                                status={"basic"}
                            >
                                Cancel
                            </Button>
                        </Card>
                    )}
                </Formik>
            </Modal>
            <Modal
                visible={visible && deleteModalVisible}
                backdropStyle={styles.backdrop}
            >
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
                            disabled={pending}
                            accessoryLeft={
                                pending ? PendingButtonIcon : SaveButtonIcon
                            }
                            style={{ marginHorizontal: 5 }}
                            onPress={del}
                            status={"danger"}
                        >
                            Yes
                        </Button>
                        <Button
                            style={{ marginHorizontal: 5 }}
                            onPress={() => setDeleteModalVisible(false)}
                            status={"basic"}
                        >
                            Cancel
                        </Button>
                    </View>
                </Card>
            </Modal>
        </View>
    );

    function save({ amount }: { amount: string }) {
        onSave(
            new Content({
                ...selectedContent,
                amount: parseFloat(amount),
            }),
        );
    }

    function del() {
        onDelete(selectedContent);
    }

    function deleteCheck() {
        setDeleteModalVisible(true);
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
