import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Layout,
    Input,
    Text,
    IndexPath,
    Select,
    SelectItem,
    ButtonGroup,
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
import { Slider } from "react-native-elements";
import { LockIcon, PositiveIcon, TrashIcon } from "../components/Icons";

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
    const [name, setName] = useState("");
    const [dumpsterTypeIndex, setDumpsterTypeIndex] = useState(
        new IndexPath(0),
    );
    const [storeTypeIndex, setStoreTypeIndex] = useState(new IndexPath(0));
    const [emptyingSchedule, setEmptyingSchedule] = useState("");
    const [cleanliness, setCleanliness] = useState(50);
    const [locked, setLocked] = useState(false);
    const [
        categorySelectedIndex,
        setCategoryMultiSelectedIndex,
    ] = React.useState([new IndexPath(0)]);
    const [positiveStoreViewOnDiving, setIsPositive] = useState(1);

    return (
        <Layout style={styles.container}>
            <Input
                style={{ width: "80%" }}
                placeholder="Name"
                label="Store name"
                onChangeText={text => setName(text)}
                value={name}
            />

            <View
                style={{
                    height: "5%",
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row",
                }}
            >
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
                        index instanceof IndexPath && setStoreTypeIndex(index)
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
                onSelect={index => setCategoryMultiSelectedIndex(index)}
            >
                {categories.map((type, i) => (
                    <SelectItem key={i} title={type} />
                ))}
            </Select>
            <View
                style={{
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row",
                }}
            >
                <View style={{ width: "10%" }}>
                    <PositiveIcon />
                </View>
                <ButtonGroup style={{ width: "90%" }} appearance={"outline"}>
                    <Button
                        style={{ width: "33.3%", paddingHorizontal: 5 }}
                        onPress={() => setIsPositive(0)}
                    >
                        Negative
                    </Button>
                    <Button
                        style={{ width: "33.3%", paddingHorizontal: 5 }}
                        onPress={() => setIsPositive(1)}
                    >
                        Neutral
                    </Button>
                    <Button
                        style={{ width: "33.3%", paddingHorizontal: 5 }}
                        onPress={() => setIsPositive(2)}
                    >
                        Positive
                    </Button>
                </ButtonGroup>
            </View>

            <View
                style={{
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row",
                }}
            >
                <View style={{ width: "10%" }}>
                    <LockIcon />
                </View>

                <ButtonGroup style={{ width: "90%" }} appearance={"outline"}>
                    <Button
                        style={{ width: "50%" }}
                        onPress={() => setLocked(true)}
                    >
                        Locked
                    </Button>
                    <Button
                        style={{ width: "50%" }}
                        onPress={() => setLocked(false)}
                    >
                        Open
                    </Button>
                </ButtonGroup>
            </View>

            <View
                style={{
                    height: "5%",
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row",
                }}
            >
                <View style={{ width: "10%" }}>
                    <TrashIcon />
                </View>
                <Input
                    style={{ width: "90%" }}
                    placeholder="Emptied at times..."
                    onChangeText={text => setEmptyingSchedule(text)}
                    value={emptyingSchedule}
                />
            </View>

            <View
                style={{
                    height: "5%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row",
                }}
            >
                <Text>Cleanliness:</Text>
                <Slider
                    animateTransitions
                    animationType="timing"
                    maximumTrackTintColor="#ccc"
                    maximumValue={100}
                    minimumTrackTintColor="#222"
                    minimumValue={0}
                    onSlidingComplete={setCleanliness}
                    orientation="horizontal"
                    step={1}
                    style={{ width: "60%", height: 200, marginLeft: 5 }}
                    thumbStyle={{ height: 20, width: 20 }}
                    thumbTouchSize={{ width: 40, height: 40 }}
                    trackStyle={{ height: 10, borderRadius: 20 }}
                    value={cleanliness}
                />
            </View>

            <View
                style={{
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row",
                }}
            >
                <Button
                    appearance={"outline"}
                    status={"basic"}
                    style={{ width: " 48%", margin: "2%" }}
                    onPress={() => console.log("photo")}
                >
                    Add photo
                </Button>
                <Button
                    status={"basic"}
                    style={{ width: " 48%", margin: "2%" }}
                    onPress={handleSubmit}
                >
                    Save
                </Button>
            </View>
        </Layout>
    );

    function showCategories() {
        let categoryValues = "";
        categorySelectedIndex.map(
            (type, i) =>
                (categoryValues +=
                    categories[categorySelectedIndex[i].row] + ", "),
        );
        return categoryValues;
    }

    function handleSubmit() {
        let positiveView = null;
        if (positiveStoreViewOnDiving === 0) {
            positiveView = false;
        } else if (positiveStoreViewOnDiving === 2) {
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
            cleanliness,
            positiveStoreViewOnDiving: positiveView,
            locked,
        };
        console.log(dumpster.positiveStoreViewOnDiving); // TODO: delete this afterwards
        // Then reset the editor's state
        dispatch(resetEditor());
        // And navigate back to where you were before!
        navigation.dispatch(StackActions.popToTop());
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 400,
        alignItems: "center",
        justifyContent: "center",
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexGrow: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    width: {
        width: "100%",
    },
});
