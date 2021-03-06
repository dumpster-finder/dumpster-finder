import * as React from "react";
import Dumpster, { UpdatedDumpster } from "../../models/Dumpster";
import { Button, IndexPath, Input, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import DropdownSelect from "../selects/DropdownSelect";
import MultiSelect from "../selects/MultiSelect";
import {
    LockIcon,
    PendingButtonIcon,
    PositiveIcon,
    SaveButtonIcon,
    TrashInputIcon,
} from "../basicComponents/Icons";
import ButtonGroupDisplay from "../basicComponents/ButtonGroupDisplay";
import Rating from "../basicComponents/Rating";
import { useSelector } from "react-redux";
import {
    dumpsterTypesSelector,
    storeTypesSelector,
    categoriesSelector,
} from "../../redux/slices/constantsSlice";
import { useTranslation } from "react-i18next";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";

export default function DumpsterEditor({
    dumpster,
    onSave,
    mode,
    pending,
}: {
    dumpster: Omit<Dumpster, "rating">;
    onSave: (newDumpster: UpdatedDumpster) => void;
    mode: "edit" | "create";
    pending?: boolean;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("editor");
    const dumpsterTypes = useSelector(dumpsterTypesSelector);
    const storeTypes = useSelector(storeTypesSelector);
    const cleanlinessRange = [
        t("cleanliness.filthy"),
        t("cleanliness.dirty"),
        t("cleanliness.average"),
        t("cleanliness.clean"),
        t("cleanliness.pristine"),
    ];
    const categories = useSelector(categoriesSelector);

    return (
        <ScrollView
            scrollEnabled
            style={styles.fullWidth}
            contentContainerStyle={styles.container}
        >
            <Formik
                initialValues={{
                    name: dumpster.name,
                    dumpsterType: dumpsterTypes.indexOf(dumpster.dumpsterType),
                    storeType: storeTypes.indexOf(dumpster.storeType),
                    categories: dumpster.categories.map(c =>
                        categories.indexOf(c),
                    ),
                    emptyingSchedule: dumpster.emptyingSchedule,
                    storeView:
                        dumpster.positiveStoreViewOnDiving === null
                            ? 1
                            : !dumpster.positiveStoreViewOnDiving
                            ? 0
                            : 2,
                    locked: dumpster.locked ? 0 : 1,
                    cleanliness: dumpster.cleanliness - 1,
                    extraInfo: dumpster.info,
                }}
                onSubmit={actuallySubmit}
                validationSchema={Yup.object().shape({
                    // Hello. According to separation of concerns, we should draw this out in its own file.
                    // However, in this case, the validation is very much related to the way the editor works.
                    // (idk if that's a valid argument, though)
                    name: Yup.string()
                        .max(64)
                        .required(),
                    dumpsterType: Yup.number()
                        .integer()
                        .min(0),
                    storeType: Yup.number()
                        .integer()
                        .min(0),
                    categories: Yup.array()
                        .of(
                            Yup.number()
                                .integer()
                                .min(0),
                        )
                        .strict()
                        .required(),
                    emptyingSchedule: Yup.string().max(128),
                    storeView: Yup.number()
                        .integer()
                        .min(0)
                        .max(2)
                        .required(),
                    locked: Yup.number()
                        .integer()
                        .min(0)
                        .max(1)
                        .required(),
                    cleanliness: Yup.number()
                        .integer()
                        .min(0)
                        .max(4)
                        .required(),
                    extraInfo: Yup.string().max(500), // just to set a limit, idk
                })}
            >
                {({
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <>
                        <Input
                            style={styles.inputField}
                            label={t("storeName.label")!}
                            placeholder={t("storeName.placeholder")}
                            onChangeText={handleChange("name")}
                            value={values.name}
                            status={errors.name && "danger"}
                            caption={
                                errors.name &&
                                (errors.name.includes("required")
                                    ? t("storeName.errorEmpty")!
                                    : t("storeName.errorLong")!)
                            }
                        />
                        <View style={styles.inputField}>
                            <DropdownSelect
                                value={values.dumpsterType}
                                label={t("common:dumpsterType")}
                                values={dumpsterTypes.map(v =>
                                    t(`dumpsterType:${v}`),
                                )}
                                onSelect={i => setFieldValue("dumpsterType", i)}
                                status={errors.dumpsterType && "danger"}
                                caption={
                                    errors.dumpsterType &&
                                    t("dumpsterType.errorEmpty")!
                                }
                            />
                        </View>
                        <View style={styles.inputField}>
                            <DropdownSelect
                                value={values.storeType}
                                label={t("common:storeType")}
                                values={storeTypes.map(s =>
                                    t(`storeType:${s}`),
                                )}
                                onSelect={i => setFieldValue("storeType", i)}
                                status={errors.storeType && "danger"}
                                caption={
                                    errors.storeType &&
                                    t("storeType.errorEmpty")!
                                }
                            />
                        </View>

                        <View style={styles.inputField}>
                            <MultiSelect
                                sValue={values.categories.map(
                                    i => new IndexPath(i),
                                )}
                                label={t("common:categories")}
                                values={categories.map(c =>
                                    t(`categories:${c}`),
                                )}
                                onSelect={xs =>
                                    setFieldValue(
                                        "categories",
                                        xs.map(x => x.row),
                                    )
                                }
                            />
                        </View>

                        <View style={styles.inputField}>
                            <Input
                                accessoryLeft={TrashInputIcon}
                                label={t("emptyingSchedule.label")!}
                                placeholder={t("emptyingSchedule.placeholder")}
                                onChangeText={handleChange("emptyingSchedule")}
                                value={values.emptyingSchedule}
                                status={errors.emptyingSchedule && "danger"}
                                caption={
                                    errors.emptyingSchedule &&
                                    t("emptyingSchedule.errorLong")!
                                }
                            />
                        </View>

                        <View style={styles.row}>
                            <ButtonGroupDisplay
                                value={values.storeView}
                                values={[
                                    "negative",
                                    "neutral",
                                    "positive",
                                ].map(v => t(`${v}`))}
                                icon={PositiveIcon}
                                label={t("view")}
                                onSelect={i => setFieldValue("storeView", i)}
                            />
                        </View>

                        <View style={styles.row}>
                            <ButtonGroupDisplay
                                value={values.locked}
                                values={[
                                    t("common:locked"),
                                    t("common:unlocked"),
                                ]}
                                label={t("locked.label")}
                                icon={LockIcon}
                                onSelect={i => setFieldValue("locked", i)}
                            />
                        </View>

                        <Text category="s2" appearance="hint">
                            {t("common:cleanliness")!}
                        </Text>
                        <View style={styles.row}>
                            <Rating
                                value={values.cleanliness}
                                onChange={i => setFieldValue("cleanliness", i)}
                                stringList={cleanlinessRange}
                            />
                        </View>

                        <View style={styles.inputField}>
                            <Input
                                label={t("extraInfo.label")!}
                                placeholder={t("extraInfo.placeholder")}
                                multiline
                                size="large"
                                textStyle={{
                                    minHeight: 64,
                                    /* Yes, kitten is so shitty that you have to *state* that the text should start at the top...*/
                                    textAlignVertical: "top",
                                }}
                                onChangeText={handleChange("extraInfo")}
                                value={values.extraInfo}
                                status={errors.extraInfo && "danger"}
                                caption={
                                    errors.extraInfo && t("extraInfo.errorLong")
                                }
                            />
                        </View>

                        {/* TODO picture stuff */}
                        <Button
                            status="primary"
                            disabled={pending || !isValid}
                            onPress={() => handleSubmit()}
                            accessoryLeft={
                                pending ? PendingButtonIcon : SaveButtonIcon
                            }
                        >
                            {mode === "create" ? t("create")! : t("save")!}
                        </Button>
                    </>
                )}
            </Formik>
        </ScrollView>
    );

    function actuallySubmit(values: FormikValues) {
        onSave({
            dumpsterID: dumpster.dumpsterID,
            name: values.name,
            position: dumpster.position,
            dumpsterType: dumpsterTypes[values.dumpsterType],
            storeType: storeTypes[values.storeType],
            categories: values.categories.map((i: number) => categories[i]),
            emptyingSchedule: values.emptyingSchedule,
            cleanliness: values.cleanliness + 1,
            // Do not use strict equality here. We're dealing with *strings*
            positiveStoreViewOnDiving:
                values.storeView == 1 ? null : values.storeView == 2,
            locked: values.locked == 0,
            info: values.extraInfo,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "5%",
        paddingVertical: 12,
    },
    fullWidth: {
        width: "100%",
    },
    icon: {
        width: "10%",
    },
    row: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    inputField: {
        width: "100%",
        paddingVertical: 4,
    },
    nextToIcon: {
        width: "90%",
    },
    photoBox: {
        minHeight: "20%",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        flexDirection: "row",
    },
    photo: {
        display: "flex",
        alignItems: "stretch",
        width: "70%",
        height: "100%",
    },
});
