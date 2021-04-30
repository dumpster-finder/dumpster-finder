import * as React from "react";
import {
    Button,
    Card,
    CheckBox,
    IndexPath,
    Modal,
    Text,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {
    categoriesSelector,
    dumpsterTypesSelector,
    storeTypesSelector,
} from "../redux/slices/constantsSlice";
import {
    dumpsterFilterSelector,
    setDumpsterFilter,
} from "../redux/slices/configSlice";
import SingleMultiSelect from "../components/selects/SingleMultiSelect";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MultiSliderComp from "./MultiSliderComp";
import { useAppDispatch } from "../redux/store";
import _ from "lodash";

const transformSelectionToIndexPathArray = (
    defaults: string[],
    selection?: string[],
) =>
    selection // TODO avoid indexOf
        ? selection.map(c => new IndexPath(selection.indexOf(c)))
        : defaults.map((_, i) => new IndexPath(i));

export default function FilterModal({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const dispatch = useAppDispatch();
    const dumpsterTypes = useSelector(dumpsterTypesSelector);
    const storeTypes = useSelector(storeTypesSelector);
    const categories = useSelector(categoriesSelector);
    const filter = useSelector(dumpsterFilterSelector);
    const lock = ["all", "locked", "unlocked"];
    const [selectedDumpsters, setSelectedDumpsters] = useState(
        transformSelectionToIndexPathArray(dumpsterTypes, filter.dumpsterTypes),
    );
    const [selectedStores, setSelectedStores] = useState(
        transformSelectionToIndexPathArray(storeTypes, filter.storeTypes),
    );
    const [selectedCategories, setSelectedCategories] = useState(
        transformSelectionToIndexPathArray(categories, filter.categories),
    );
    const [locked, setLocked] = useState(
        filter.locked === undefined ? 0 : filter.locked ? 1 : 2,
    );
    const [rating, setRating] = useState(
        filter.rating ? filter.rating.map(i => i - 1) : [0, 4],
    );
    const [cleanliness, setCleanliness] = useState(
        filter.cleanliness ? filter.cleanliness.map(i => i - 1) : [0, 4],
    );
    const [storeView, setStoreView] = useState(
        filter.positiveStoreView || [0, 2],
    );

    const ratingLabels = [
        {
            index: 0,
            stepLabel: "1",
            prefix: "",
            suffix: "",
        },
        {
            index: 1,
            stepLabel: "2",
            prefix: "",
            suffix: "",
        },
        {
            index: 2,
            stepLabel: "3",
            prefix: "",
            suffix: "",
        },
        {
            index: 3,
            stepLabel: "4",
            prefix: "",
            suffix: "",
        },
        {
            index: 4,
            stepLabel: "5",
            prefix: "",
            suffix: "",
        },
    ];

    const cleanlinessLabels = [
        {
            index: 0,
            stepLabel: t("cleanliness:filthy"),
            prefix: "",
            suffix: "",
        },
        {
            index: 1,
            stepLabel: t("cleanliness:dirty"),
            prefix: "",
            suffix: "",
        },
        {
            index: 2,
            stepLabel: t("cleanliness:average"),
            prefix: "",
            suffix: "",
        },
        {
            index: 3,
            stepLabel: t("cleanliness:clean"),
            prefix: "",
            suffix: "",
        },
        {
            index: 4,
            stepLabel: t("cleanliness:pristine"),
            prefix: "",
            suffix: "",
        },
    ];
    const viewLabels = [
        {
            index: 0,
            stepLabel: t("negative"),
            prefix: "",
            suffix: "",
        },
        {
            index: 1,
            stepLabel: t("neutral"),
            prefix: "",
            suffix: "",
        },
        {
            index: 2,
            stepLabel: t("positive"),
            prefix: "",
            suffix: "",
        },
    ];

    // const renderDropdown = (
    //     name: string,
    //     list: string[],
    //     setSelected: (xs: IndexPath[]) => void,
    //     selectAll: () => void,
    // ) => (
    //     <View style={styles.dropdown}>
    //         <SingleMultiSelect
    //             style={styles.dropdownField}
    //             sValue={selectedCategories}
    //             label={t(name)}
    //             values={list.map(c => t(`${name}:${c}`))}
    //             onSelect={setSelected}
    //         />
    //         <Button
    //             status="basic"
    //             size="small"
    //             style={styles.dropdownButton}
    //             onPress={selectAll}
    //         >
    //             {t("all")}
    //         </Button>
    //     </View>
    // );

    return (
        <Modal
            style={{ width: "98%" }}
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card>
                <View style={styles.dropdown}>
                    <SingleMultiSelect
                        style={styles.dropdownField}
                        sValue={selectedDumpsters}
                        label={t("dumpsterType")}
                        values={dumpsterTypes.map(c => t(`dumpsterType:${c}`))}
                        onSelect={xs => setSelectedDumpsters(xs)}
                    />
                    <Button
                        status="basic"
                        size="small"
                        style={styles.dropdownButton}
                        onPress={selectAllDumpsterTypes}
                    >
                        {t("all")}
                    </Button>
                </View>
                <View style={styles.dropdown}>
                    <SingleMultiSelect
                        style={styles.dropdownField}
                        sValue={selectedStores}
                        label={t("storeType")}
                        values={storeTypes.map(c => t(`storeType:${c}`))}
                        onSelect={xs => setSelectedStores(xs)}
                    />
                    <Button
                        status="basic"
                        size="small"
                        style={styles.dropdownButton}
                        onPress={selectAllStoreTypes}
                    >
                        {t("all")}
                    </Button>
                </View>
                <View style={styles.dropdown}>
                    <SingleMultiSelect
                        style={styles.dropdownField}
                        sValue={selectedCategories}
                        label={t("categories")}
                        values={categories.map(c => t(`categories:${c}`))}
                        onSelect={xs => setSelectedCategories(xs)}
                    />
                    <Button
                        status="basic"
                        size="small"
                        style={styles.dropdownButton}
                        onPress={selectAllCategories}
                    >
                        {t("all")}
                    </Button>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    {lock.map((value, index) => (
                        <CheckBox
                            key={index}
                            style={styles.checkbox}
                            checked={locked === index}
                            onChange={() => setLocked(index)}
                        >
                            {t(`${value}`)}
                        </CheckBox>
                    ))}
                </View>
                <View style={styles.slider}>
                    <Text>{t("rating")}</Text>
                    <MultiSliderComp
                        values={rating}
                        max={4}
                        labels={ratingLabels}
                        onChange={setRating}
                    />
                </View>
                <View style={styles.slider}>
                    <Text>{t("cleanliness")}</Text>
                    <MultiSliderComp
                        values={cleanliness}
                        max={4}
                        labels={cleanlinessLabels}
                        onChange={setCleanliness}
                    />
                </View>
                <View style={styles.slider}>
                    <Text>{t("view")}</Text>
                    <MultiSliderComp
                        values={storeView}
                        max={2}
                        labels={viewLabels}
                        onChange={setStoreView}
                    />
                </View>

                <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    <Button
                        style={{ marginHorizontal: 5, flex: 1 }}
                        status="basic"
                        onPress={() => setVisible(false)}
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        style={{ marginHorizontal: 5, flex: 1 }}
                        status="warning"
                        onPress={handleResetFilter}
                    >
                        {t("resetFilter")}
                    </Button>
                    <Button
                        style={{ marginHorizontal: 5, flex: 1 }}
                        onPress={handleFilter}
                    >
                        {t("filter")}
                    </Button>
                </View>
            </Card>
        </Modal>
    );

    function selectAllDumpsterTypes() {
        setSelectedDumpsters(transformSelectionToIndexPathArray(dumpsterTypes));
    }

    function selectAllStoreTypes() {
        setSelectedStores(transformSelectionToIndexPathArray(storeTypes));
    }

    function selectAllCategories() {
        setSelectedCategories(transformSelectionToIndexPathArray(categories));
    }

    function handleResetFilter() {
        // Reset all state
        selectAllStoreTypes();
        selectAllDumpsterTypes();
        selectAllCategories();
        setLocked(0);
        setRating([0, 4]);
        setCleanliness([0, 4]);
        setStoreView([0, 2]);
    }

    function transformRating([min, max, ...rest]: number[]):
        | [number, number]
        | undefined {
        return min === 0 && max === 4 ? undefined : [min + 1, max + 1];
    }
    function transformSelection(defaults: string[], selection: IndexPath[]) {
        return selection.length > 0 && !(selection.length === defaults.length)
            ? selection.map(i => defaults[i.row])
            : undefined;
    }

    function handleFilter() {
        // Set new filter – make sure to set undefined where it isn't necessary to perform any filtering
        dispatch(
            setDumpsterFilter({
                categories: transformSelection(categories, selectedCategories),
                dumpsterTypes: transformSelection(
                    dumpsterTypes,
                    selectedDumpsters,
                ),
                storeTypes: transformSelection(storeTypes, selectedStores),
                positiveStoreView:
                    storeView[0] === 0 && storeView[1] === 2
                        ? undefined
                        : [storeView[0], storeView[1]],
                cleanliness: transformRating(cleanliness),
                rating: transformRating(rating),
                locked: locked === 0 ? undefined : locked === 1,
            }),
        );
        setVisible(false);
    }
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    dropdown: {
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    dropdownField: {
        flex: 1,
    },
    dropdownButton: {
        height: "67%",
    },
    checkbox: {
        marginHorizontal: 2,
        marginVertical: 5,
    },
    slider: {
        marginVertical: 10,
        alignItems: "center",
    },
});
