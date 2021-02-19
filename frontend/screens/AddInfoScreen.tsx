import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Layout,
    Input,
    Text,
    Toggle,
    IndexPath,
    Select,
    SelectItem,
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
import {LockIcon, PositiveIcon, TrashIcon} from "../components/Icons";

export default function AddInfoScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const position = useSelector(editorPositionSelector);
    const dumpsterTypes = ["Metal", "Compressor", "Plastic"];
    const storeTypes = ["Food", "Electronics"];

    const [name, setName] = useState("");
    const [dumpsterType, setDumpsterType] = useState(dumpsterTypes[0]);
    const [dumpsterTypeIndex, setDumpsterTypeIndex] = useState(
        new IndexPath(0),
    );
    const [storeType, setStoreType] = useState(storeTypes[0]);
    const [storeTypeIndex, setStoreTypeIndex] = useState(new IndexPath(0));
    const [emptyingSchedule, setEmptyingSchedule] = useState("");
    const [cleanliness, setCleanliness] = useState(50);
    const [positiveStoreViewOnDiving, setIsPositive] = useState(false);
    const [locked, setLocked] = useState(false);

    return (
        <Layout style={styles.container}>
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
                <Input
                    placeholder="Name"
                    label="Name"
                    onChangeText={text => setName(text)}
                    value={name}
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
                <Select
                    label="Dumpster type"
                    selectedIndex={dumpsterTypeIndex}
                    onSelect={index =>
                        index instanceof IndexPath &&
                        setDumpsterTypeIndex(index)
                    }
                    style={{ width: 100 }}
                >
                    {dumpsterTypes.map((type, i) => (
                        <SelectItem key={i} title={type} />
                    ))}
                </Select>
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
                <Select
                    label="Store type"
                    selectedIndex={storeTypeIndex}
                    onSelect={index =>
                        index instanceof IndexPath &&
                        setStoreTypeIndex(index)
                    }
                    style={{ width: 100 }}
                >
                    {storeTypes.map((type, i) => (
                        <SelectItem key={i} title={type} />
                    ))}
                </Select>
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
                <Input label="Tags" placeholder="IDK" />
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
                <PositiveIcon/>
                <Toggle
                    onChange={() =>
                        setIsPositive(previousState => !previousState)
                    }
                    checked={positiveStoreViewOnDiving}
                >
                    Positive attitude
                </Toggle>
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
                <LockIcon />
                <Toggle
                    onChange={() => setLocked(previousState => !previousState)}
                    checked={locked}
                >
                    Locked
                </Toggle>
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
                <TrashIcon />
                <Input
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
                    height: "10%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button style={{ width: " 50%" }}>Add photo</Button>
            </View>

            <View
                style={{
                    height: "15%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button style={{ width: " 50%" }} onPress={handleSubmit}>
                    Save
                </Button>
            </View>
        </Layout>
    );

    function handleSubmit() {
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
            positiveStoreViewOnDiving,
            locked,
        };
        console.log(dumpster); // TODO: delete this afterwards
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
