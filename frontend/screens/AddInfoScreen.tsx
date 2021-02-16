import * as React from "react";
import {Picker, StyleSheet, Switch, View} from "react-native";
import {Button, Icon, Input, Slider, Text} from "react-native-elements";
import {useState} from "react";

export default function AddInfoScreen() {
    const dumpsterTypes = ["Metal", "Compressor", "Plastic"];
    const storeTypes = ["Food", "Electronics"];

    const [name, onChangeName] = useState("");
    const [dumpster, onChangeDumpster] = useState(dumpsterTypes[0]);
    const [store, onChangeStore] = useState(storeTypes[0]);
    const [empty, onChangeEmpty] = useState("");
    const [cleanliness, onChangeClean] = useState("50");
    const [isPositive, setIsPositive] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

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
                        onChangeText={text => onChangeName(text)}
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
                        selectedValue={dumpster}
                        style={{height: 50, width: 150}}
                        onValueChange={(itemValue: string, itemIndex: number) =>
                            onChangeDumpster(itemValue)
                        }>
                        {dumpsterTypes.map(i => (
                            <Picker.Item label={i} value={i} />
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
                        selectedValue={store}
                        style={{height: 50, width: 150}}
                        onValueChange={(itemValue: string) =>
                            onChangeStore(itemValue)
                        }>
                        {storeTypes.map(i => (
                            <Picker.Item label={i} value={i} />
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
                        value={isPositive}
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
                            setIsLocked(previousState => !previousState)
                        }
                        value={isLocked}
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
                        onChangeText={text => onChangeEmpty(text)}
                        value={empty}
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
                        onSlidingComplete={value => onChangeClean(value.toString())
                            }
                        orientation="horizontal"
                        step={1}
                        style={{width: "60%", height: 200, marginLeft: 5}}
                        thumbStyle={{height: 20, width: 20}}
                        thumbTouchSize={{width: 40, height: 40}}
                        trackStyle={{height: 10, borderRadius: 20}}
                        value={parseInt(cleanliness)}
                    />
                </View>

                <View
                    style={{
                        height: "10%",
                        width: "60%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Button title="Add photo" style={{width: " 50%"}} />
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
                        style={{width: " 50%"}}
                        onPress={() => print()}
                    />
                </View>
            </View>
        </View>
    );

    function print() {
        //console.log(name);
        //console.log(dumpster);
        //console.log(store);
        //console.log(isPositive);
        //console.log(isLocked);
        //console.log(empty);
        console.log(cleanliness);
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
