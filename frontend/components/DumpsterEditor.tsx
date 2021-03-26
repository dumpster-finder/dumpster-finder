import * as React from "react";
import Dumpster from "../models/Dumpster";
import { Button, IndexPath, Input, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import Dropdown from "./Dropdown";
import GroupSelect from "./GroupSelect";
import SingleMultiSelect from "./SingleMultiSelect";
import {
    LockIcon,
    PendingButtonIcon,
    PositiveIcon,
    SaveButtonIcon,
    TrashInputIcon,
} from "./Icons";
import ButtonGroupDisplay from "./ButtonGroupDisplay";
import Rating from "./Rating";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    dumpsterTypesSelector,
    storeTypesSelector,
    categoriesSelector,
} from "../redux/slices/constantsSlice";
import { CategoryService } from "../services";
import { useTranslation } from "react-i18next";

export default function DumpsterEditor({
    dumpster,
    onSave,
    mode,
    pending,
}: {
    dumpster: Omit<Dumpster, "rating">;
    onSave: (newDumpster: Omit<Dumpster, "rating">) => void;
    mode: "edit" | "create";
    pending?: boolean;
}) {
    const { t } = useTranslation("editor");
    // const categoryData: Record<string, string[]> = {
    //     Food: ["Meat", "Fruit"],
    //     Electronics: ["TV", "IPhone"],
    //     beds: ["zzz"],
    // };
    const dumpsterTypes: string[] = useSelector(dumpsterTypesSelector);
    const storeTypes: string[] = useSelector(storeTypesSelector);
    const cleanlinessRange = [
        "Filthy",
        "Dirty",
        "Average",
        "Clean",
        "Pristine",
    ];
    const categories: string[] = useSelector(categoriesSelector);

    const [name, setName] = useState(dumpster.name);
    const [dumpsterTypeIndex, setDumpsterTypeIndex] = useState(
        dumpsterTypes.indexOf(dumpster.dumpsterType),
    );
    const [storeTypeIndex, setStoreTypeIndex] = useState(
        storeTypes.indexOf(dumpster.storeType),
    );
    const [emptyingSchedule, setEmptyingSchedule] = useState(
        dumpster.emptyingSchedule,
    );
    const [cleanliness, setCleanliness] = useState(dumpster.cleanliness - 1);
    const [locked, setLocked] = useState(dumpster.locked);
    const [storeViewIndex, setStoreViewIndex] = useState(
        dumpster.positiveStoreViewOnDiving === null
            ? 1
            : !dumpster.positiveStoreViewOnDiving
            ? 0
            : 2,
    );
    // const [categoryIndex, setCategoryIndex] = useState([
    //     new IndexPath(0, 0),
    //     new IndexPath(1, 1),
    // ]);

    const [singleCategoryIndex, SetSingleCategoryIndex] = useState([
        new IndexPath(0),
    ]);
    const [info, setInfo] = useState(dumpster.info);

    return (
        <ScrollView
            scrollEnabled
            style={styles.fullWidth}
            contentContainerStyle={styles.container}
        >
            <Input
                style={styles.inputField}
                label={t("storeName.label")!}
                placeholder={t("storeName.placeholder")}
                onChangeText={text => setName(text)}
                value={name}
            />
            <View style={styles.inputField}>
                <Dropdown
                    value={dumpsterTypeIndex}
                    label={t("dumpsterType.label")}
                    values={dumpsterTypes}
                    onSelect={setDumpsterTypeIndex}
                />
            </View>
            <View style={styles.inputField}>
                <Dropdown
                    value={storeTypeIndex}
                    label={t("storeType.label")}
                    values={storeTypes.map(s => t(`storeTypes:${s}`))}
                    onSelect={setStoreTypeIndex}
                />
            </View>
            {/* <View style={styles.inputField}>
                <GroupSelect
                    sValue={categoryIndex}
                    label="Categories"
                    values={categoryData}
                    onSelect={setCategoryIndex}
                />
            </View>*/}

            <View style={styles.inputField}>
                <SingleMultiSelect
                    sValue={singleCategoryIndex}
                    label={t("categories.label")}
                    values={categories.map(c => t(`categories:${c}`))}
                    onSelect={SetSingleCategoryIndex}
                />
            </View>

            <View style={styles.inputField}>
                <Input
                    accessoryLeft={TrashInputIcon}
                    label={t("emptyingSchedule.label")!}
                    placeholder={t("emptyingSchedule.placeholder")}
                    onChangeText={text => setEmptyingSchedule(text)}
                    value={emptyingSchedule}
                />
            </View>

            <View style={styles.row}>
                <ButtonGroupDisplay
                    value={storeViewIndex}
                    values={["negative", "neutral", "positive"].map(v =>
                        t(`storeView.${v}`),
                    )}
                    icon={PositiveIcon}
                    label={t("storeView.label")}
                    onSelect={setStoreViewIndex}
                />
            </View>

            <View style={styles.row}>
                <ButtonGroupDisplay
                    value={locked ? 0 : 1}
                    values={[t("locked.locked"), t("locked.unlocked")]}
                    label={t("locked.label")}
                    icon={LockIcon}
                    onSelect={i => setLocked(i === 0)}
                />
            </View>

            <Text category="s2" appearance="hint">
                {t("cleanliness.label")!}
            </Text>
            <View style={styles.row}>
                <Rating
                    value={cleanliness}
                    onChange={setCleanliness}
                    stringList={cleanlinessRange.map(c =>
                        t(`cleanliness:${c.toLowerCase()}`),
                    )}
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
                    onChangeText={setInfo}
                    value={info}
                />
            </View>

            {/* TODO picture stuff */}
            <Button
                status="primary"
                disabled={pending}
                onPress={handleSubmit}
                accessoryLeft={pending ? PendingButtonIcon : SaveButtonIcon}
            >
                {mode === "create" ? t("create")! : t("save")!}
            </Button>
        </ScrollView>
    );

    function handleSubmit() {
        onSave({
            dumpsterID: dumpster.dumpsterID,
            name,
            position: dumpster.position,
            dumpsterType: dumpsterTypes[dumpsterTypeIndex],
            storeType: storeTypes[storeTypeIndex],
            emptyingSchedule,
            cleanliness: cleanliness + 1,
            positiveStoreViewOnDiving:
                storeViewIndex === 1 ? null : storeViewIndex === 2,
            locked,
            info,
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
