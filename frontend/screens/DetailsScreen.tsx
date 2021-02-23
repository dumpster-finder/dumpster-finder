import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import {AirbnbRating } from 'react-native-ratings';
import {Button, Layout, Text} from "@ui-kitten/components";
import {
    FlagIcon,
    EditIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    TrashIcon,
    StarIcon,
    NegativeIcon,
    PositiveIcon,
    LockIcon,
} from "../components/Icons";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { useState } from "react";

export default function DetailsScreen() {
    const dumpster = useSelector(currentDumpsterSelector);
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
    let a = false;

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
            <Layout style={styles.container}>
                <View
                    style={{
                        height: "100%",
                        width: 390,
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            height: "10%",
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            style={{ width: "15%", margin: 2 }}
                            appearance="ghost"
                            status="danger"
                            accessoryLeft={FlagIcon}
                        />

                        <View style={{ width: "70%", alignItems: "center" }}>
                            <Text category="h4">{dumpster.name}</Text>
                        </View>
                        <Button
                            style={{ width: "15%", margin: 2 }}
                            appearance="ghost"
                            status="danger"
                            accessoryLeft={EditIcon}
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
                        }}
                    >
                        <Text category="h6">{dumpster.storeType}</Text>
                        <View
                            style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                style={{ width: "10%" }}
                                appearance="ghost"
                                status="danger"
                                accessoryLeft={ArrowLeftIcon}
                                onPress={() => {
                                    if (photoDisp - 1 >= 0) {
                                        onPhotoChange(photoDisp - 1);
                                    } else {
                                        onPhotoChange(photos.length - 1);
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
                            <Button
                                style={{ width: "10%" }}
                                appearance="ghost"
                                status="danger"
                                accessoryLeft={ArrowRightIcon}
                                onPress={() => {
                                    if (photoDisp + 1 >= photos.length) {
                                        photoCounter = 0;
                                        onPhotoChange(0);
                                    } else {
                                        ++photoCounter;
                                        onPhotoChange(photoDisp + 1);
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
                                            // backgroundColor: "blue",
                                        }}
                                    >
                                        {tagArrays.map(tagArray => (
                                            <View
                                                style={{
                                                    width: "100%",
                                                    flex: 1,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "flex-start",
                                                }}
                                            >
                                                {tagArray.map(tag => (
                                                    <Text
                                                        style={{
                                                            backgroundColor:
                                                                "lightgray",
                                                            marginVertical: 2,
                                                            marginHorizontal: 5,
                                                            borderRadius: 10,
                                                            paddingVertical: 3,
                                                            paddingHorizontal: 5,
                                                        }}
                                                    >
                                                        {tag}
                                                    </Text>
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
                                        }}
                                    >
                                        {tags.map(tag => (
                                            <Text
                                                style={{
                                                    backgroundColor:
                                                        "lightgray",
                                                    marginVertical: 2,
                                                    marginHorizontal: 5,
                                                    borderRadius: 10,
                                                    paddingVertical: 3,
                                                    paddingHorizontal: 5,
                                                }}
                                            >
                                                {tag}
                                            </Text>
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
                        }}
                    >
                        <View
                            style={{
                                width: "95%",
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
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
                                    }}
                                >
                                    <TrashIcon size="medium" />
                                    <View
                                        style={{
                                            width: "90%",
                                            paddingLeft: 5,
                                        }}
                                    >
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
                                    }}
                                >
                                    <StarIcon size="medium" />
                                    <View
                                        style={{
                                            width: "90%",
                                            paddingLeft: 5,
                                        }}
                                    >
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
                                    }}
                                >
                                    {dumpster.locked ? (
                                        <>
                                            <LockIcon size="medium" />
                                            <Text style={{ paddingLeft: 5 }}>
                                                Locked
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <LockIcon size="medium" />
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
                                    }}
                                >
                                    {dumpster.positiveStoreViewOnDiving ===
                                    null ? (
                                        <>
                                            <PositiveIcon size="medium" />
                                            <Text style={{ paddingLeft: 5 }}>
                                                Unknown
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            {dumpster.positiveStoreViewOnDiving ? (
                                                <>
                                                    <PositiveIcon size="medium" />
                                                    <Text
                                                        style={{
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        Positive attitude
                                                    </Text>
                                                </>
                                            ) : (
                                                <>
                                                    <NegativeIcon size="medium" />
                                                    <Text
                                                        style={{
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        Negative attitude
                                                    </Text>
                                                </>
                                            )}
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
                                    }}
                                >
                                    <View style={{ width: "50%" }}>
                                        <Text>Cleanliness:</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "50%",
                                            height: "100%",
                                            paddingHorizontal: 5,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: "100%",
                                                height: "60%",
                                                backgroundColor: "lightgray",
                                                borderRadius: 5,
                                                borderWidth: 1,
                                            }}
                                        >
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
                                    }}
                                >
                                    <View style={{ width: "50%" }}>
                                        <Text>Type: </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "90%",
                                            paddingLeft: 5,
                                        }}
                                    >
                                        <Text>{dumpster.dumpsterType}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Button
                                status={"basic"}
                                size={"small"}
                                onPress={() => console.log("Comment")}
                            >
                                Comment
                            </Button>
                        </View>
                        <Text>Rate me:</Text>
                        <View style={{ height: "20%" }}>
                            <AirbnbRating size={20} showRating={false} />
                        </View>
                    </View>
                </View>
            </Layout>
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
