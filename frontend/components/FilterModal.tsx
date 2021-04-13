import * as React from "react";
import {
    Button,
    Card,
    CheckBox,
    IndexPath,
    Modal,
    Text,
} from "@ui-kitten/components";
import Content from "../models/Content";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {
    categoriesSelector,
    dumpsterTypesSelector,
    storeTypesSelector,
} from "../redux/slices/constantsSlice";
import SingleMultiSelect from "./SingleMultiSelect";
import { useTranslation } from "react-i18next";
import { useState } from "react";

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

    const lock = [t("all"), t("locked"), t("unlocked")];
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
    const [locked, setLocked] = useState("");

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
                            {value}
                        </CheckBox>
                    ))}
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
});
