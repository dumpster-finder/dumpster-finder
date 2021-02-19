import * as React from "react";
import { Picker, StyleSheet, Switch, View } from "react-native";
import { Button, Icon, Input, Slider, Text } from "react-native-elements";
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
    const [storeType, setStoreType] = useState(storeTypes[0]);
    const [emptyingSchedule, setEmptyingSchedule] = useState("");
    const [cleanliness, setCleanliness] = useState(50);
    const [positiveStoreViewOnDiving, setIsPositive] = useState(false);
    const [locked, setLocked] = useState(false);


    return (
        <View style={styles.container}>
            <View
                style={{
                    height: "100%",
                    width: 400,
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                <View
                    style={{
                        height: "5%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                    }}>
                    <Text>Name:</Text>
                    <Input
                        placeholder="Name"
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
                    }}>
                    <Text>Dumpster type:</Text>
                    <Picker
                        selectedValue={dumpsterType}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue: string, itemIndex: number) =>
                            setDumpsterType(itemValue)
                        }>
                        {dumpsterTypes.map(i => (
                            <Picker.Item key={i} label={i} value={i} />
                        ))}
                    </Picker>
                </View>
                <View
                    style={{
                        height: "5%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                    }}>
                    <Text>Store type:</Text>
                    <Picker
                        selectedValue={storeType}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue: string) =>
                            setStoreType(itemValue)
                        }>
                        {storeTypes.map(i => (
                            <Picker.Item key={i} label={i} value={i} />
                        ))}
                    </Picker>
                </View>
                <View
                    style={{
                        height: "5%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                    }}>
                    <Text>Tags:</Text>
                    <Input placeholder="IDK" />
                </View>
                <View
                    style={{
                        height: "5%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                    }}>
                    <Switch
                        onValueChange={() =>
                            setIsPositive(previousState => !previousState)
                        }
                        value={positiveStoreViewOnDiving}
                    />
                    <Icon name="thumbs-up" type="font-awesome" />
                    <Text>Positive attitude</Text>
                </View>

                <View
                    style={{
                        height: "5%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                    }}>
                    <Switch
                        onValueChange={() =>
                            setLocked(previousState => !previousState)
                        }
                        value={locked}
                    />
                    <Icon name="lock" type="font-awesome" />
                    <Text>Locked</Text>
                </View>

                <View
                    style={{
                        height: "5%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                    }}>
                    <Icon name="delete" />
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
                    }}>
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
                    }}>
                    <Button title="Add photo" style={{ width: " 50%" }} />
                </View>

                <View
                    style={{
                        height: "15%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Button
                        title="Save dumpster"
                        style={{ width: " 50%" }}
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </View>
    );

    function handleSubmit() {
        // Post the dumpster, add it to the list of dumpster if that succeeds
        // TODO: actually make the above happen
        //       it is now substituted with this:
        // (rating is omitted because it is calculated later, idk what the backend will do rn)
        const dumpster: Omit<Dumpster, "dumpsterID" | "rating"> = {
            name,
            position,
            dumpsterType,
            storeType,
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
