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
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Content from "../../models/Content";
import { PendingButtonIcon, SaveButtonIcon } from "../basicComponents/Icons";
import { AirbnbRating } from "react-native-ratings";
import { useState } from "react";

/**
 * Return modal that lets user enter information about an item they found and add it to the app.
 * @param visible
 * @param setVisible
 * @param pending
 * @param onAdd
 *
 */
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
    const [datePicker, setDatePicker] = useState<Datepicker | null>(null);
    const dimensions = useWindowDimensions();

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
                    <Card
                        style={[styles.card, { width: dimensions.width * 0.9 }]}
                    >
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
                                style={[
                                    styles.smallInput,
                                    styles.smallInputLeft,
                                ]}
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
                            // @ts-ignore
                            ref={r => setDatePicker(r)}
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
                                style={{ marginHorizontal: 5, flex: 1 }}
                                status={"basic"}
                                onPress={onCancel}
                            >
                                {t("cancel")}
                            </Button>
                            <Button
                                disabled={pending}
                                accessoryLeft={
                                    pending ? PendingButtonIcon : SaveButtonIcon
                                }
                                style={{ marginHorizontal: 5, flex: 1 }}
                                onPress={() => {
                                    handleSubmit();
                                }}
                            >
                                {t("add")}
                            </Button>
                        </View>
                    </Card>
                )}
            </Formik>
        </Modal>
    );

    function onCancel() {
        if (datePicker) datePicker.hide();
        setVisible(false);
    }

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
        if (datePicker) datePicker.hide();
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
    card: {
        alignItems: "center",
    },
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
        width: "100%",
    },
    input: {
        paddingTop: 5,
    },
    smallInputLeft: {
        marginRight: 10,
    },
    smallInput: {
        flex: 1,
    },
});
