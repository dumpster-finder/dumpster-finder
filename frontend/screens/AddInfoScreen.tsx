import * as React from "react";
import {Picker, StyleSheet, Switch, View} from "react-native";
import {Button, Icon, Input, Slider, Text} from "react-native-elements";

export default function AddInfoScreen() {
return(
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
                    flexDirection: "row"
                }}>
                <Text>Name:</Text>
                <Input placeholder="Name" />
            </View>

            <View
                style={{
                    height: "5%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row"
                }}>
                <Text>Dumpster type:</Text>
                <Picker
                    selectedValue={'Dumpster'}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
                    >
                    <Picker.Item label="Metal" value="metal" />
                    <Picker.Item label="Compressor" value="compressor" />
                </Picker>
            </View>
            <View
                style={{
                    height: "5%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row"
                }}>
                <Text>Store type:</Text>
                <Picker
                    selectedValue={'Dumpster'}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
                >
                    <Picker.Item label="FOOOOOOD" value="food" />
                    <Picker.Item label="Electronics" value="electro" />
                </Picker>
            </View>
            <View
                style={{
                    height: "5%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row"
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
                    flexDirection: "row"
                }}>
                <Switch value={true} />
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
                    flexDirection: "row"
                }}>
                <Switch value={true} />
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
                    flexDirection: "row"
                }}>
                <Icon name="delete" />
                <Input placeholder="Emptied at times..." />
            </View>

            <View
                style={{
                    height: "5%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row"
                }}>
                <Text>Cleanliness:</Text>
                <Slider
                    animateTransitions
                    animationType="timing"
                    maximumTrackTintColor="#ccc"
                    maximumValue={100}
                    minimumTrackTintColor="#222"
                    minimumValue={0}
                    onSlidingComplete={() =>
                        console.log("onSlidingComplete()")
                    }
                    onSlidingStart={() =>
                        console.log("onSlidingStart()")
                    }
                    onValueChange={value =>
                        console.log("onValueChange()", value)
                    }
                    orientation="horizontal"
                    step={1}
                    style={{ width: "60%", height: 200, marginLeft: 5 }}
                    thumbStyle={{ height: 20, width: 20 }}
                    thumbTintColor="#0c0"
                    thumbTouchSize={{ width: 40, height: 40 }}
                    trackStyle={{ height: 10, borderRadius: 20 }}
                    value={50}
                />

            </View>

            <View
                style={{
                    height: "10%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Button
                    title="Add photo"
                    style={{width: " 50%"}}
                />
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
                />
            </View>
        </View>
    </View>
);
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