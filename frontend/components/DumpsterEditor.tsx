import * as React from "react";
import Dumpster from "../models/Dumpster";
import { Button, IndexPath, Input, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import Dropdown from "./Dropdown";
import GroupSelect from "./GroupSelect";
import {
    LockIcon,
    PendingIcon,
    PositiveIcon,
    SaveIcon,
    TrashIcon,
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
    const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
        new IndexPath(0, 0),
        new IndexPath(1, 1),
    ]);

    return (
        <ScrollView
            scrollEnabled
            style={styles.fullWidth}
            contentContainerStyle={styles.container}
        >
            <Input
                label="Store name"
                placeholder="e.g. Tesco in East London"
                onChangeText={text => setName(text)}
                value={name}
            />
            <View style={styles.row}>
                <Dropdown
                    value={dumpsterTypeIndex}
                    label="Dumpster type"
                    values={dumpsterTypes}
                    onSelect={setDumpsterTypeIndex}
                />
                <Dropdown
                    value={storeTypeIndex}
                    label="Store type"
                    values={storeTypes}
                    onSelect={setStoreTypeIndex}
                />
            </View>
            <View style={styles.row}>
                <GroupSelect
                    sValue={multiSelectedIndex}
                    label="Categories"
                    values={categoryData}
                    onSelect={setMultiSelectedIndex}
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

            <View style={styles.row}>
                <View style={styles.icon}>
                    <TrashIcon size="medium" />
                </View>
                <Input
                    style={styles.nextToIcon}
                    label="Emptying schedule"
                    placeholder="e.g. First Monday in the month"
                    onChangeText={text => setEmptyingSchedule(text)}
                    value={emptyingSchedule}
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

            {/* TODO picture stuff */}
            <Button
                status="primary"
                disabled={pending}
                onPress={handleSubmit}
                accessoryLeft={pending ? PendingIcon : SaveIcon}
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
        });
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "10%",
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
