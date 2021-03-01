import * as React from "react";
import Dumpster from "../models/Dumpster";
import { Button, IndexPath, Input, Text } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import Dropdown from "./Dropdown";
import GroupSelect from "./GroupSelect";
import { LockIcon, PositiveIcon, TrashIcon } from "./Icons";
import ButtonGroupDisplay from "./ButtonGroupDisplay";
import Rating from "./Rating";
import { useState } from "react";

export default function DumpsterEditor({
    dumpster,
    onSave,
}: {
    dumpster: Dumpster;
    onSave: (newDumpster: Dumpster) => void;
}) {
    const categoryData: Record<string, string[]> = {
        Food: ["Meat", "Fruit"],
        Electronics: ["TV", "IPhone"],
        beds: ["zzz"],
    };
    const dumpsterTypes: string[] = ["Metal", "Compressor", "Plastic"];
    const storeTypes: string[] = ["Food", "Electronics"];
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
    const [cleanliness, setCleanliness] = useState(dumpster.cleanliness);
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
                style={{ width: "80%" }}
                placeholder="Name"
                label="Store name"
                onChangeText={text => setName(text)}
                value={name}
            />
            <View style={styles.row}>
                <Dropdown
                    value={dumpsterTypeIndex}
                    label={"Dumpster type"}
                    values={dumpsterTypes}
                    onSelect={setDumpsterTypeIndex}
                />
                <Dropdown
                    value={storeTypeIndex}
                    label={"Store type"}
                    values={storeTypes}
                    onSelect={setStoreTypeIndex}
                />
            </View>
            <View style={styles.row}>
                <GroupSelect
                    sValue={multiSelectedIndex}
                    label={"Categories"}
                    values={categoryData}
                    onSelect={setMultiSelectedIndex}
                />
            </View>
            <View style={{ width: "80%", paddingTop: "3%" }}>
                <Text>Store's view on dumpster diving:</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.icon}>
                    <PositiveIcon size="medium" />
                </View>
                <ButtonGroupDisplay
                    value={storeViewIndex}
                    values={view}
                    onSelect={setStoreViewIndex}
                />
            </View>

            <View style={styles.row}>
                <View style={styles.icon}>
                    <LockIcon size="medium" />
                </View>

                <ButtonGroupDisplay
                    value={locked ? 0 : 1}
                    values={lock}
                    onSelect={i => setLocked(i === 0)}
                />
            </View>

            <View style={{ width: "80%" }}>
                <Text>Emptying schedule:</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.icon}>
                    <TrashIcon size="medium" />
                </View>
                <Input
                    style={styles.nextToIcon}
                    placeholder="Emptied at times..."
                    onChangeText={text => setEmptyingSchedule(text)}
                    value={emptyingSchedule}
                />
            </View>
            <View style={{ width: "80%" }}>
                <Text>Cleanliness:</Text>
            </View>
            <View style={styles.row}>
                <Rating
                    value={cleanliness}
                    onChange={setCleanliness}
                    stringList={cleanlinessRange}
                />
            </View>

            <View style={styles.row}>
                <Button
                    appearance="outline"
                    status="primary"
                    style={{ width: " 48%", margin: "2%" }}
                    onPress={() => console.log(cleanliness)}
                >
                    Add photo
                </Button>
                <Button
                    status="primary"
                    style={{ width: " 48%", margin: "2%" }}
                    onPress={onSaveClick}
                >
                    Save
                </Button>
            </View>
        </ScrollView>
    );

    function onSaveClick() {
        if (name !== "") {
            console.log(locked)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    fullWidth: {
        width: "100%",
        minHeight: "100%",
    },
    icon: {
        width: "10%",
    },
    row: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    nextToIcon: {
        width: "90%",
    },
    photoBox: {
        width: "80%",
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
