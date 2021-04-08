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
            <Formik
                initialValues={{
                    name: "",
                    amount: "",
                    unit: "",
                    expiryDate: null,
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required(),
                    amount: Yup.number(),
                    unit: Yup.string(),
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
                        <Text category={"h5"}>Add content</Text>
                        <Divider />
                        <Input
                            style={styles.input}
                            label={"Product"}
                            placeholder={"Product name"}
                            value={values.name}
                            onChangeText={handleChange("name")}
                            status={errors.name && "danger"}
                            caption={errors.name}
                        />

                        <View style={styles.row}>
                            <Input
                                style={styles.smallInput}
                                label={"Amount"}
                                keyboardType={"number-pad"}
                                placeholder={"0"}
                                value={values.amount}
                                onChangeText={handleChange("amount")}
                                status={errors.amount && "danger"}
                                caption={errors.amount}
                            />
                            <View style={{ width: "9%" }} />
                            <Input
                                style={styles.smallInput}
                                label={"Unit"}
                                placeholder={"Unit"}
                                value={values.unit}
                                onChangeText={handleChange("unit")}
                                status={errors.unit && "danger"}
                                caption={errors.unit}
                            />
                        </View>
                        <Datepicker
                            style={styles.input}
                            label={"Expires on"}
                            placeholder={"Select date..."}
                            date={values.expiryDate}
                            onSelect={change =>
                                setFieldValue("expiryDate", change)
                            }
                            status={errors.expiryDate && "danger"}
                            // caption={errors.expiryDate}
                        />
                        <View style={styles.row}>
                            <Button
                                style={{ marginHorizontal: 5 }}
                                onPress={() => {
                                    console.log(values, errors);
                                    handleSubmit();
                                }}
                            >
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
