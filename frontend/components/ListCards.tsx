import * as React from "react";
import {Card, Text, Icon} from "react-native-elements";
import {View} from "./Themed";
import {Image, TouchableOpacity} from "react-native";
import Dumpster from "../models/Dumpster";


export default function ListCards({dumpster}: {dumpster: Dumpster}) {
    return (
        <TouchableOpacity
            onPress={() => {
                console.log("does not work");
            }}>
            <Card
                containerStyle={{width: "95%", height: 150, padding: 0}}
                wrapperStyle={{flex: 1, flexDirection: "row"}}>
                <Image
                    style={{
                        display: "flex",
                        alignItems: "stretch",
                        width: "40%",
                    }}
                    resizeMode="contain"
                    source={{
                        uri:
                            "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
                    }}
                />
                <View style={{width: "60%"}}>
                    <Card.Title>
                        <Text h4>{dumpster.name}</Text>
                    </Card.Title>
                    <Text>{dumpster.storeType}</Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}>
                        <View style={{width: "33%", alignItems: "flex-start"}}>
                            <Text>0.2 km</Text>
                        </View>
                        <View
                            style={{
                                width: "33%",
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}>
                            <View
                                style={{width: "50%", alignItems: "flex-end"}}>
                                <Icon name="star" color="#FFD100" />
                            </View>
                            <View
                                style={{
                                    width: "50%",
                                    alignItems: "flex-start",
                                }}>
                                <Text>{dumpster.rating}</Text>
                            </View>
                        </View>
                        <View style={{width: "33%", alignItems: "flex-end"}}>
                            {dumpster.locked ? (
                                <Icon name="lock" type="font-awesome" color="#FF0000" />
                            ) : null}
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
}
