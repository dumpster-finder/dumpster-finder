import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text, Card, Divider } from "@ui-kitten/components";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    TrashIcon,
    StarIcon,
    NegativeIcon,
    PositiveIcon,
    LockIcon,
    MessageIcon,
    MenuIcon,
    OpenLockIcon,
    BrushIcon,
} from "../components/Icons";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import Burgermenu from "../components/Burgermenu";
import PhotoDisplay from "../components/PhotoDisplay";

export default function DetailsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dumpster = useSelector(currentDumpsterSelector);
    const categories = [
        "Food",
        "milk",
        "juice",
        "Fruit",
        "Tears",
        "Fear",
        "ZZZ",
    ];
    const categoryArrays = [];
    const categoryPrLine = 4;
    const photos = [
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
    ];
    const text =
        "This is some dummy text with information about the dumpster. I don't know the specifics yet ¯\\_(ツ)_/¯";

    if (categories.length > categoryPrLine) {
        const turns = categories.length / categoryPrLine;
        for (let i = 0; i < turns; i++) {
            const newArray = categories.slice(
                i * categoryPrLine,
                categoryPrLine * (i + 1),
            );
            categoryArrays.push(newArray);
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
                <ScrollView style={styles.scrollView}>
                    <View style={styles.row}>
                        <View style={{ width: "10%" }} />
                        <View style={{ width: "80%", alignItems: "center" }}>
                            <Text category="h4">{dumpster.name}</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text category="h6">{dumpster.storeType}</Text>
                    </View>

                    <View style={{ height: 100 }}>
                        <PhotoDisplay photoList={photos} />
                    </View>

                    <View style={styles.infoView}>
                        <View style={styles.infoRow}>
                            <View style={styles.threeRowStart}>
                                <StarIcon size="medium" />
                                <Text style={styles.infoText}>
                                    Rating: {dumpster.rating.toFixed(1)}
                                </Text>
                            </View>
                            <View style={styles.threeRowCenter}>
                                <BrushIcon size="medium" />
                                <Text style={styles.infoText}>
                                    Cleanliness: {dumpster.cleanliness}
                                </Text>
                            </View>
                            <View style={styles.threeRowEnd}>
                                {dumpster.locked ? (
                                    <>
                                        <LockIcon size="medium" />
                                        <Text style={styles.infoText}>
                                            Locked
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <OpenLockIcon size="medium" />
                                        <Text style={styles.infoText}>
                                            Unlocked
                                        </Text>
                                    </>
                                )}
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <TrashIcon size="medium" />
                            <Text style={styles.infoText}>
                                Emptying schedule: {dumpster.emptyingSchedule}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            {dumpster.positiveStoreViewOnDiving ? (
                                <PositiveIcon size="medium" />
                            ) : dumpster.positiveStoreViewOnDiving === null ? (
                                <PositiveIcon size="medium" /> // TODO decide what icon to have here...
                            ) : (
                                <NegativeIcon size="medium" />
                            )}
                            <Text style={styles.infoText}>
                                Store's view on dumpster diving:{" "}
                                {dumpster.positiveStoreViewOnDiving ? (
                                    <Text>Positive</Text>
                                ) : dumpster.positiveStoreViewOnDiving ===
                                  null ? (
                                    <Text>Neutral</Text>
                                ) : (
                                    <Text>Negative</Text>
                                )}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text>Dumpster type: {dumpster.dumpsterType}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Divider />
                            <Text style={{ paddingVertical: 2 }}>{text}</Text>
                            <Divider />
                        </View>
                    </View>
                    <Text style={{ alignSelf: "center" }}>Categories:</Text>
                    {categories.length > categoryPrLine ? (
                        <View style={styles.column}>
                            {categoryArrays.map(array => (
                                <View style={styles.tagRow}>
                                    {array.map((category, index) => (
                                        <View
                                            style={{
                                                width:
                                                    100 / categoryPrLine + "%",
                                                alignItems: "center",
                                                paddingBottom: 5,
                                            }}
                                        >
                                            <Text>{category}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.column}>
                            <View style={styles.tagRow}>
                                {categories.map((category, index) => (
                                    <View
                                        style={{
                                            width: 100 / categoryPrLine + "%",
                                            alignItems: "center",
                                            paddingBottom: 5,
                                            borderRadius: 10,
                                            borderWidth: 10,
                                        }}
                                    >
                                        <Text>{category}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                    <View style={styles.row}>
                        <View style={styles.buttons}>
                            <Button
                                style={{ width: "70%" }}
                                size={"small"}
                                onPress={() =>
                                    navigation.navigate("ContentScreen", {
                                        screen: "ContentScreen",
                                    })
                                }
                            >
                                See content
                            </Button>
                        </View>
                        <View style={styles.buttons}>
                            <Button
                                style={{ width: "70%" }}
                                size={"small"}
                                onPress={() =>
                                    navigation.navigate("CommentScreen", {
                                        screen: "CommentScreen",
                                    })
                                }
                            >
                                See comments
                            </Button>
                        </View>
                    </View>

                    <Text style={{ alignSelf: "center" }}>Rate me:</Text>
                    <View style={styles.row}>
                        <View style={{ width: "10%" }} />
                        <View style={{ width: "80%" }}>
                            <AirbnbRating size={20} showRating={false} />
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        );
    }

    function menuSelect(menuIndex: number) {
        switch (menuIndex) {
            case 0:
                console.log("flag");
                break;
            case 1:
                console.log("Revision");
                break;
            case 2:
                console.log("Edit");
                navigation.navigate("EditDumpsterScreen", {
                    screen: "EditDumpsterScreen",
                });
                break;
            case 3:
                navigation.navigate("EditContentScreen", {
                    screen: "EditContentScreen",
                });
                break;
            default:
                console.log(menuIndex);
                break;
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "100%",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    buttons: {
        paddingVertical: 10,
        width: "50%",
        alignItems: "center",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        padding: 5,
    },
    threeRowStart: {
        flex: 1,
        flexDirection: "row",
        width: "33.3%",
        justifyContent: "flex-start",
    },

    threeRowCenter: {
        flex: 1,
        flexDirection: "row",
        width: "33.3%",
        justifyContent: "center",
    },
    threeRowEnd: {
        flex: 1,
        flexDirection: "row",
        width: "33.3%",
        justifyContent: "flex-end",
    },
    infoView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    infoRow: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 5,
    },
    infoText: {
        paddingLeft: 5,
    },
    infoBox: {
        paddingVertical: 5,
    },
    tagRow: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    fullWidth: {
        width: "100%",
        minHeight: "100%",
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        width: "80%",
    },
    photoRow: {
        width: "100%",
        height: "30%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    listing: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    sideIcons: {
        width: "15%",
    },
    photo: {
        display: "flex",
        alignItems: "stretch",
        width: "70%",
        height: "100%",
    },
    tagLayout: {
        backgroundColor: "lightgray",
        marginVertical: 2,
        marginHorizontal: 5,
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
});
