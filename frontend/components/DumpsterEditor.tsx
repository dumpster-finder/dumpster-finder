import * as React from "react";
import Dumpster from "../models/Dumpster";
import { Button, IndexPath, Input, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import Dropdown from "./Dropdown";
import GroupSelect from "./GroupSelect";
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
} from "../redux/slices/constantsSlice";

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
    const categoryData: Record<string, string[]> = {
        Food: ["Meat", "Fruit"],
        Electronics: ["TV", "IPhone"],
        beds: ["zzz"],
    };
    const dumpsterTypes: string[] = useSelector(dumpsterTypesSelector);
    const storeTypes: string[] = useSelector(storeTypesSelector);
    const cleanlinessRange = [
        "Filthy",
        "Dirty",
        "Average",
        "Clean",
        "Pristine",
    ];
    const lock = ["Locked", "Unlocked"];
    const view = ["Negative", "Neutral", "Positive"];

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
    const [categoryIndex, setCategoryIndex] = useState([
        new IndexPath(0, 0),
        new IndexPath(1, 1),
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
                label="Store name"
                placeholder="e.g. Tesco in East London"
                onChangeText={text => setName(text)}
                value={name}
            />
            <View style={styles.inputField}>
                <Dropdown
                    value={dumpsterTypeIndex}
                    label="Dumpster type"
                    values={dumpsterTypes}
                    onSelect={setDumpsterTypeIndex}
                />
            </View>
            <View style={styles.inputField}>
                <Dropdown
                    value={storeTypeIndex}
                    label="Store type"
                    values={storeTypes}
                    onSelect={setStoreTypeIndex}
                />
            </View>
            <View style={styles.inputField}>
                <GroupSelect
                    sValue={categoryIndex}
                    label="Categories"
                    values={categoryData}
                    onSelect={setCategoryIndex}
                />
            </View>

            <View style={styles.inputField}>
                <Input
                    accessoryLeft={TrashInputIcon}
                    label="Emptying schedule"
                    placeholder="e.g. First Monday in the month"
                    onChangeText={text => setEmptyingSchedule(text)}
                    value={emptyingSchedule}
                />
            </View>

            <View style={styles.row}>
                <ButtonGroupDisplay
                    value={storeViewIndex}
                    values={view}
                    icon={PositiveIcon}
                    label="Store's view on dumpster diving"
                    onSelect={setStoreViewIndex}
                />
            </View>

            <View style={styles.row}>
                <ButtonGroupDisplay
                    value={locked ? 0 : 1}
                    values={lock}
                    label="Dumpster state"
                    icon={LockIcon}
                    onSelect={i => setLocked(i === 0)}
                />
            </View>

            <Text category="s2" appearance="hint">
                Cleanliness
            </Text>
            <View style={styles.row}>
                <Rating
                    value={cleanliness}
                    onChange={setCleanliness}
                    stringList={cleanlinessRange}
                />
            </View>

            <View style={styles.inputField}>
                <Input
                    label="Extra info"
                    placeholder="(anything that doesn't fit elsewhere)"
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
                {mode === "create" ? "Create dumpster" : "Save dumpster"}
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
