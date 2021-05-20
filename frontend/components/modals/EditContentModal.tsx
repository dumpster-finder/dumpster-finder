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
import Content from "../../models/Content";
import { useState } from "react";
import {
    DeleteButtonIcon,
    PendingButtonIcon,
    SaveButtonIcon,
} from "../basicComponents/Icons";
import { formatDate } from "../../utils/date";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { AirbnbRating } from "react-native-ratings";

/**
 * Modal that lets user edit the registered content if they have taken some or it is gone.
 * @param visible
 * @param setVisible
 * @param pending
 * @param selectedContent
 * @param onSave
 * @param onDelete
 *
 */
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
    const { t }: { t: (s: string) => string } = useTranslation("contents");
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
                        quality: selectedContent.quality || 0,
                    }}
                    validationSchema={Yup.object().shape({
                        amount: Yup.number().positive(),
                        quality: Yup.number()
                            .min(0)
                            .max(5)
                            .optional(),
                    })}
                    onSubmit={save}
                >
                    {({
                        handleChange,
                        setFieldValue,
                        handleSubmit,
                        values,
                        errors,
                    }) => (
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
                                    label={t("amountLabel")}
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
                            <View style={styles.row}>
                                <Text style={styles.boldText}>
                                    {t("quality")}:{" "}
                                </Text>
                                <AirbnbRating
                                    size={20}
                                    showRating={false}
                                    defaultRating={selectedContent.quality || 0}
                                    onFinishRating={change =>
                                        setFieldValue("quality", change)
                                    }
                                />
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
                                {t("save")}
                            </Button>
                            <Button
                                status={"danger"}
                                style={{ marginVertical: 10 }}
                                onPress={deleteCheck}
                                accessoryLeft={DeleteButtonIcon}
                            >
                                {t("remove")}
                            </Button>
                            <Button
                                onPress={() => setVisible(false)}
                                status={"basic"}
                            >
                                {t("cancel")}
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
                    <Text>{t("areYouSure")}</Text>
                    <Divider />
                    <View style={styles.row}>
                        <Button
                            disabled={pending}
                            accessoryLeft={
                                pending ? PendingButtonIcon : DeleteButtonIcon
                            }
                            style={{ marginHorizontal: 5 }}
                            onPress={del}
                            status={"danger"}
                        >
                            {t("remove")}
                        </Button>
                        <Button
                            style={{ marginHorizontal: 5 }}
                            onPress={() => setDeleteModalVisible(false)}
                            status={"basic"}
                        >
                            {t("cancel")}
                        </Button>
                    </View>
                </Card>
            </Modal>
        </View>
    );

    function save({ amount, quality }: { amount: string; quality: number }) {
        console.log(quality);
        onSave(
            new Content({
                ...selectedContent,
                amount: parseFloat(amount),
                quality: quality || undefined,
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
        flexDirection: "row",
        paddingVertical: 2,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    input: {
        alignSelf: "center",
        maxWidth: "70%",
        minWidth: "70%",
    },
    boldText: {
        alignSelf: "flex-start",
        fontWeight: "bold",
    },
});
