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
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Content from "../../models/Content";
import { PendingButtonIcon, SaveButtonIcon } from "../basicComponents/Icons";
import { AirbnbRating } from "react-native-ratings";

export default function AddContentModal({
    visible,
    setVisible,
    pending,
    onAdd,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
    pending: boolean;
    onAdd: (content: Pick<Content, "name"> & Partial<Content>) => any;
}) {
    // temp decalaration that makes TS shut up...
    const { t }: { t: (s: string) => string } = useTranslation(
        "contentsEditor",
    );

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Formik
                initialValues={{
                    name: "",
                    amount: "",
                    unit: "",
                    quality: 0,
                    expiryDate: null,
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .max(24)
                        .required(),
                    amount: Yup.number(),
                    unit: Yup.string().max(12),
                    quality: Yup.number()
                        .min(0)
                        .max(5)
                        .optional(),
                    expiryDate: Yup.date().nullable(),
                })}
                onSubmit={add}
            >
                {({
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                    values,
                    errors,
                }) => (
                    <Card style={{ alignItems: "center" }}>
                        <Text category={"h5"} style={styles.title}>
                            {t("addTitle")}
                        </Text>
                        <Divider />
                        <Input
                            style={styles.input}
                            label={t("name.label")}
                            placeholder={t("name.placeholder")}
                            value={values.name}
                            onChangeText={handleChange("name")}
                            status={errors.name && "danger"}
                            caption={
                                errors.name &&
                                (errors.name.includes("required")
                                    ? t("name.errorEmpty")
                                    : t("name.errorLong"))
                            }
                        />

                        <View style={styles.row}>
                            <Input
                                style={styles.smallInput}
                                label={t("amount.label")}
                                keyboardType={"number-pad"}
                                placeholder={t("amount.placeholder")}
                                value={values.amount}
                                onChangeText={handleChange("amount")}
                                status={errors.amount && "danger"}
                                caption={
                                    errors.amount && t("amount.errorInvalid")
                                }
                            />
                            <View style={{ width: "9%" }} />
                            <Input
                                style={styles.smallInput}
                                label={t("unit.label")}
                                placeholder={t("unit.placeholder")}
                                value={values.unit}
                                onChangeText={handleChange("unit")}
                                status={errors.unit && "danger"}
                                caption={errors.unit && t("unit.errorLong")}
                            />
                        </View>
                        <View
                            style={{ flexDirection: "row", marginVertical: 5 }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                }}
                            >
                                {t("contents:quality")}:
                            </Text>
                            <AirbnbRating
                                size={20}
                                showRating={false}
                                defaultRating={0}
                                onFinishRating={change =>
                                    setFieldValue("quality", change)
                                }
                            />
                        </View>

                        <Datepicker
                            style={styles.input}
                            label={t("expiryDate.label")}
                            placeholder={t("expiryDate.placeholder")}
                            date={values.expiryDate}
                            onSelect={change =>
                                setFieldValue("expiryDate", change)
                            }
                            status={errors.expiryDate && "danger"}
                            // caption={errors.expiryDate}
                        />
                        <View style={[styles.row, styles.marginAbove]}>
                            <Button
                                disabled={pending}
                                accessoryLeft={
                                    pending ? PendingButtonIcon : SaveButtonIcon
                                }
                                style={{ marginHorizontal: 5 }}
                                onPress={() => {
                                    handleSubmit();
                                }}
                            >
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
                )}
            </Formik>
        </Modal>
    );

    async function add({
        name,
        amount,
        unit,
        quality,
        expiryDate,
    }: {
        name: string;
        amount: string;
        unit: string;
        quality: number;
        expiryDate: Date | null;
    }) {
        await onAdd({
            name,
            amount: parseFloat(amount) || undefined,
            unit: unit || undefined,
            quality: quality || undefined,
            expiryDate: expiryDate || undefined,
        });
    }
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 4,
    },
    marginAbove: {
        marginTop: 4,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    row: {
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
