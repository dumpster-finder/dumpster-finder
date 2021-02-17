import * as React from "react";
import { View } from "../components/Themed";
import { Image, StyleSheet } from "react-native";
import { Button, Icon, Text, AirbnbRating, Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { selectCurrentDumpster } from "../redux/slices/dumpsterSlice";
import {useState} from "react";

export default function DetailsScreen() {
    const dumpster = useSelector(selectCurrentDumpster);
    const tags = ["Food", "milk", "juice", "Fruit", "Tears"];
    const tagArrays = [];
    const tagNrLine = 3;
    const photos = [
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
    ];
    const [photoDisp, onPhotoChange] = useState(0);
    let photoCounter = 0;

    if (tags.length > tagNrLine) {
        const turns = tags.length / tagNrLine;
        for (let i = 0; i < turns; i++) {
            const newArray = tags.slice(i * tagNrLine, tagNrLine * (i + 1));
            tagArrays.push(newArray);
        }
    }
    if (dumpster === null) {
        return (
            <View style={styles.container}>
                <Text>CRY</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        height: "100%",
                        width: 390,
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <View
                        style={{
                            height: "10%",
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Icon
                            name="flag"
                            type="font-awesome"
                            style={{ width: "5%" }}
                            onPress={() => {
                                console.log("flag");
                            }}
                        />
                        <View style={{ width: "90%", alignItems: "center" }}>
                            <Text h3>{dumpster.name}</Text>
                        </View>
                        <Icon
                            name="edit"
                            type="font-awesome"
                            style={{ width: "5%" }}
                            onPress={() => {
                                console.log("edit");
                            }}
                        />
                    </View>
                    <View
                        style={{
                            height: "45%",
                            width: "100%",
                            flex: 5,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text h4>{dumpster.storeType}</Text>
                        <View
                            style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <Icon
                                name="chevron-left"
                                type="font-awesome"
                                style={{ width: "10%" }}
                                onPress={() => {
                                    if (photoDisp - 1 >= 0) {
                                        onPhotoChange(photoDisp-1)
                                    } else {
                                        onPhotoChange(photos.length - 1)
                                    }
                                }}
                            />
                            <Image
                                style={{
                                    display: "flex",
                                    alignItems: "stretch",
                                    width: "80%",
                                    height: "100%",
                                }}
                                resizeMode="contain"
                                source={{
                                    uri: photos[photoDisp],
                                }}
                            />
                            <Icon
                                name="chevron-right"
                                type="font-awesome"
                                style={{ width: "10%" }}
                                onPress={() => {
                                    if (photoDisp + 1 >= photos.length) {
                                        photoCounter = 0;
                                        onPhotoChange(0)
                                    } else {
                                        ++photoCounter;
                                        onPhotoChange(photoDisp + 1)
                                    }
                                }}
                            />
                        </View>
                        <View style={{ height: "32%" }}>
                            {tags.length > tagNrLine ? (
                                <>
                                    <View
                                        style={{
                                            height: "100%",
                                            flex: 1,
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "blue",
                                        }}>
                                        {tagArrays.map(tagArray => (
                                            <View
                                                style={{
                                                    width: "100%",
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "flex-start",
                                                }}>
                                                {tagArray.map(tag => (
                                                    <Card
                                                        containerStyle={{
                                                            backgroundColor:
                                                                "lightgray",
                                                            borderRadius: 10,
                                                            paddingVertical: 0,
                                                            paddingHorizontal: 5,
                                                        }}>
                                                        <Text
                                                            style={{
                                                                backgroundColor:
                                                                    "lightgray",
                                                                marginVertical: 2,
                                                                marginHorizontal: 5,
                                                            }}>
                                                            {tag}
                                                        </Text>
                                                    </Card>
                                                ))}
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View
                                        style={{
                                            width: "100%",
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                        }}>
                                        {tags.map(tag => (
                                            <Card
                                                containerStyle={{
                                                    backgroundColor:
                                                        "lightgray",
                                                    borderRadius: 10,
                                                    paddingVertical: 0,
                                                    paddingHorizontal: 5,
                                                }}>
                                                <Text
                                                    style={{
                                                        backgroundColor:
                                                            "lightgray",
                                                        marginVertical: 2,
                                                        marginHorizontal: 5,
                                                    }}>
                                                    {tag}
                                                </Text>
                                            </Card>
                                        ))}
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            height: "50%",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <View
                            style={{
                                width: "95%",
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <View style={{ width: "50%" }}>
                                <Text>I am left</Text>
                            </View>
                            <View style={{ width: "50%" }}>
                                <View
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                    <Icon
                                        name="delete"
                                        style={{ width: "10%" }}
                                        onPress={() => {
                                            console.log("arrow-right");
                                        }}
                                    />
                                    <View
                                        style={{
                                            width: "90%",
                                            paddingLeft: 5,
                                        }}>
                                        <Text>{dumpster.emptyingSchedule}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                    <Icon
                                        name="star"
                                        color="#FFD100"
                                        style={{ width: "10%" }}
                                        onPress={() => {
                                            console.log("arrow-right");
                                        }}
                                    />
                                    <View
                                        style={{
                                            width: "90%",
                                            paddingLeft: 5,
                                        }}>
                                        <Text>{dumpster.rating}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}>
                                    {dumpster.locked ? (
                                        <>
                                            <Icon
                                                name="lock"
                                                type="font-awesome"
                                                color="#FF0000"
                                            />
                                            <Text style={{ paddingLeft: 5 }}>
                                                Locked
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Icon
                                                name="unlock"
                                                type="font-awesome"
                                                color="#54C500"
                                            />
                                            <Text style={{ paddingLeft: 5 }}>
                                                Open
                                            </Text>
                                        </>
                                    )}
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}>
                                    {dumpster.positiveStoreViewOnDiving ? (
                                        <>
                                            <Icon
                                                name="thumbs-up"
                                                type="font-awesome"
                                            />
                                            <Text style={{ paddingLeft: 5 }}>
                                                Positive attitude
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Icon
                                                name="thumbs-down"
                                                type="font-awesome"
                                            />
                                            <Text style={{ paddingLeft: 5 }}>
                                                Negative attitude
                                            </Text>
                                        </>
                                    )}
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}>
                                    <View style={{ width: "50%" }}>
                                        <Text>Cleanliness:</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "50%",
                                            height: "100%",
                                            paddingHorizontal: 5,
                                            justifyContent: "center",
                                        }}>
                                        <View
                                            style={{
                                                width: "100%",
                                                height: "60%",
                                                backgroundColor: "lightgray",
                                                borderRadius: 5,
                                                borderWidth: 1,
                                            }}>
                                            <View
                                                style={{
                                                    width:
                                                        dumpster.cleanliness +
                                                        "%",
                                                    height: "100%",
                                                    backgroundColor: "gray",
                                                    borderRadius: 5,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}>
                                    <View style={{ width: "50%" }}>
                                        <Text>Type: </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "90%",
                                            paddingLeft: 5,
                                        }}>
                                        <Text>{dumpster.dumpsterType}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Button
                                title="Comments"
                                style={{ width: " 50%" }}
                                buttonStyle={{
                                    backgroundColor: "gray",
                                    paddingVertical: 2,
                                }}
                                titleStyle={{ color: "black" }}
                            />
                        </View>
                        <Text>Rate me:</Text>
                        <View style={{ height: "20%" }}>
                            <AirbnbRating size={20} showRating={false} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        width: "80%",
    },
});
