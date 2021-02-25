import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Layout,
    Input,
    IndexPath,
    Select,
    SelectItem,
    Text,
} from "@ui-kitten/components";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import {
    editorPositionSelector,
    resetEditor,
} from "../redux/slices/editorSlice";
import { useSelector } from "react-redux";
import Dumpster from "../models/Dumpster";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";
import {
    CleanIcon,
    FadedCleanIcon,
    LockIcon,
    PositiveIcon,
    TrashIcon,
} from "../components/Icons";
import { DumpsterService } from "../services";
import Rating from "../components/Rating";
import ButtonGroupDisplay from "../components/ButtonGroupDisplay";

export default function AddInfoScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(editorPositionSelector);
    const dumpsterTypes = ["Metal", "Compressor", "Plastic"];
    const storeTypes = ["Food", "Electronics"];
    const categories = ["Meat", "Fruit", "Vegetables", "Spices"];
    const cleanlinessRange = [
        "Filthy",
        "Dirty",
        "Average",
        "Clean",
        "Pristine",
    ];
    const lock = ["Locked", "Unlocked"];
    const view = ["Negative", "Neutral", "Positive"];

    const [name, setName] = useState("");
    const [dumpsterTypeIndex, setDumpsterTypeIndex] = useState(
        new IndexPath(0),
    );
    const [storeTypeIndex, setStoreTypeIndex] = useState(new IndexPath(0));
    const [emptyingSchedule, setEmptyingSchedule] = useState("");
    const [cleanliness, setCleanliness] = useState(2);
    const [locked, setLocked] = useState(false);
    const [
        categorySelectedIndex,
        setCategoryMultiSelectedIndex,
    ] = React.useState([new IndexPath(0)]);
    let storeViewValue = 1;


    return (
        <Layout>
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
                    <Select
                        label="Dumpster type"
                        selectedIndex={dumpsterTypeIndex}
                        value={dumpsterTypes[dumpsterTypeIndex.row]}
                        onSelect={index =>
                            index instanceof IndexPath &&
                            setDumpsterTypeIndex(index)
                        }
                        style={{ width: "48%", margin: "2%" }}
                    >
                        {dumpsterTypes.map((type, i) => (
                            <SelectItem key={i} title={type} />
                        ))}
                    </Select>
                    <Select
                        label="Store type"
                        selectedIndex={storeTypeIndex}
                        value={storeTypes[storeTypeIndex.row]}
                        onSelect={index =>
                            index instanceof IndexPath &&
                            setStoreTypeIndex(index)
                        }
                        style={{ width: "48%", margin: "2%" }}
                    >
                        {storeTypes.map((type, i) => (
                            <SelectItem key={i} title={type} />
                        ))}
                    </Select>
                </View>
                <Select
                    label="Categories"
                    style={{ width: "80%" }}
                    multiSelect={true}
                    placeholder="Categories"
                    value={showCategories()}
                    selectedIndex={categorySelectedIndex}
                    onSelect={index =>
                        Array.isArray(index) &&
                        setCategoryMultiSelectedIndex(index)
                    }
                >
                    {categories.map((type, i) => (
                        <SelectItem key={i} title={type} />
                    ))}
                </Select>
                <View style={{ width: "80%", paddingTop: "3%" }}>
                    <Text>Store's view on dumpster diving:</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.icon}>
                        <PositiveIcon size="medium" />
                    </View>
                    <ButtonGroupDisplay values={view} onSelect={storeView}/>
                </View>

                <View style={styles.row}>
                    <View style={styles.icon}>
                        <LockIcon size="medium" />
                    </View>

                    <ButtonGroupDisplay values={lock} onSelect={isLocked}/>
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
                    <Rating value={cleanliness} onChange={setCleanliness} />
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
                        onPress={handleSubmit}
                    >
                        Save
                    </Button>
                </View>
            </ScrollView>
        </Layout>
    );

    function storeView(index: number){
        storeViewValue = index;
    }

    function isLocked(index: number){
        if(index === 0){
            setLocked(false)
        }else{
            setLocked(true)
        }
    }

    function showCategories() {
        return categorySelectedIndex
            .map(({ row }) => categories[row])
            .join(", ");
    }

    function handleSubmit() {

        let positiveView = null;
        if (storeViewValue === 0) {
            positiveView = false;
        } else if (storeViewValue === 2) {
            positiveView = true;
        }
        console.log(positiveView)
        if (name != "") {
            let clean = cleanliness + 1;
            let positiveView = null;
            if (storeViewValue === 0) {
                positiveView = false;
            } else if (storeViewValue === 2) {
                positiveView = true;
            }
            // Post the dumpster, add it to the list of dumpster if that succeeds
            // TODO: actually make the above happen
            //       it is now substituted with this:
            // (rating is omitted because it is calculated later, idk what the backend will do rn)
            const dumpster: Omit<Dumpster, "dumpsterID" | "rating"> = {
                name,
                position,
                dumpsterType: dumpsterTypes[dumpsterTypeIndex.row],
                storeType: storeTypes[storeTypeIndex.row],
                emptyingSchedule,
                cleanliness: clean,
                positiveStoreViewOnDiving: positiveView,
                locked,
            };
            DumpsterService.addDumpster(dumpster);
            //console.log(dumpster.positiveStoreViewOnDiving); // TODO: delete this afterwards
            // Then reset the editor's state
            dispatch(resetEditor());
            // And navigate back to where you were before!
            navigation.dispatch(StackActions.popToTop());
        } else {
            console.log("Does not have name");
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
        marginHorizontal: 4,
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
});
