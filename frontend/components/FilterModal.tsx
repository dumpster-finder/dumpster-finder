import * as React from "react";
import {
    Button,
    Card,
    CheckBox,
    IndexPath,
    Modal,
    Text,
} from "@ui-kitten/components";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {
    categoriesSelector,
    dumpsterTypesSelector,
    storeTypesSelector,
} from "../redux/slices/constantsSlice";
import SingleMultiSelect from "../components/selects/SingleMultiSelect";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MultiSliderComp from "./MultiSliderComp";

export default function FilterModal({
    visible,
    setVisible,
}: {
    visible: boolean;
    setVisible: (newVisible: boolean) => void;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("common");
    const dumpsterTypes = useSelector(dumpsterTypesSelector);
    const storeTypes = useSelector(storeTypesSelector);
    const categories = useSelector(categoriesSelector);
    const lock = ["all", "locked", "unlocked"];
    const [selectedDumpsters, setSelectedDumpsters] = useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    const [selectedStores, setSelectedStores] = useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    const [selectedCategories, setSelectedCategories] = useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    const [locked, setLocked] = useState(lock[0]);
    const [rating, setRating] = useState([0, 4]);
    const [cleanliness, setCleanliness] = useState([0, 4]);
    const [view, setView] = useState([0, 2]);

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
                        sValue={selectedDumpsters}
                        label={t("dumpsterType")}
                        values={dumpsterTypes.map(c => t(`dumpsterType:${c}`))}
                        onSelect={xs => setSelectedDumpsters(xs)}
                    />
                </View>
                <View style={styles.dropdown}>
                    <SingleMultiSelect
                        sValue={selectedStores}
                        label={t("storeType")}
                        values={storeTypes.map(c => t(`storeType:${c}`))}
                        onSelect={xs => setSelectedStores(xs)}
                    />
                </View>
                <View style={styles.dropdown}>
                    <SingleMultiSelect
                        sValue={selectedCategories}
                        label={t("categories")}
                        values={categories.map(c => t(`categories:${c}`))}
                        onSelect={xs => setSelectedCategories(xs)}
                    />
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
                            checked={locked === value}
                            onChange={next => setLocked(value)}
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
                        values={view}
                        max={2}
                        labels={viewLabels}
                        onChange={setView}
                    />
                </View>

                <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    <Button
                        style={{ marginHorizontal: 5, minWidth: "40%" }}
                        status="basic"
                    >
                        {t("cancel")}
                    </Button>
                    <Button style={{ marginHorizontal: 5, minWidth: "40%" }}>
                        {t("filter")}
                    </Button>
                </View>
            </Card>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    dropdown: {
        marginVertical: 5,
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
