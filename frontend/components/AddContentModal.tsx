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

export default function AddContentModal({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
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
                    expiryDate: null,
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(24).required(),
                    amount: Yup.number(),
                    unit: Yup.string().max(12),
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
                                style={{ marginHorizontal: 5 }}
                                onPress={() => {
                                    console.log(values, errors);
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

    function add({
        name,
        amount,
        unit,
        expiryDate,
    }: {
        name: string;
        amount: string;
        unit: string;
        expiryDate: Date | null;
    }) {
        const contents = {
            name,
            amount: amount || undefined,
            unit: unit || undefined,
            expiryDate: expiryDate || undefined,
        };
        // TODO servicify
        console.log(contents);
        // eventually
        setVisible(false);
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
