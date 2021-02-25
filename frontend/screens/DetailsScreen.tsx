import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text, Card } from "@ui-kitten/components";
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

export default function DetailsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dumpster = useSelector(currentDumpsterSelector);
    const categories = ["Food", "milk", "juice", "Fruit", "Tears"];
    const categoryArrays = [];
    const categoryPrLine = 3;
    const photos = [
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
    ];
    const text =
        "This is some dummy text about information on the dumpster. I don't know the specifics yet";

    const [photoDisp, onPhotoChange] = useState(0);
    const [menu, setMenu] = useState(-1);

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
                <View style={styles.fullWidth}>
                    <View style={{
                        height: "60%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <View style={styles.listing}>
                            <View style={styles.sideIcons} ><Text category="h6">{dumpster.storeType}</Text></View>
                            <View style={{ width: "70%", alignItems: "center" }}>
                                <Text category="h4">{dumpster.name}</Text>
                            </View>
                            <View style={styles.sideIcons}>
                                <Burgermenu
                                    onSelect={menuSelect}
                                />
                            </View>
                        </View>
                        <View style={styles.listing}>
                            <Button
                                style={styles.listing}
                                appearance="ghost"
                                accessoryLeft={ArrowLeftIcon}
                                onPress={() => backArrow()}
                            />
                            <Image
                                style={styles.photo}
                                resizeMode="contain"
                                source={{
                                    uri: photos[photoDisp],
                                }}
                            />
                            <Button
                                style={styles.sideIcons}
                                appearance="ghost"
                                accessoryLeft={ArrowRightIcon}
                                onPress={() => forwardArrow()}
                            />
                        </View>
                        <Card>
                            <Text>{text}</Text>
                        </Card>
                        {categories.length > categoryPrLine ? (
                            <>
                                <View
                                    style={{
                                        height: "100%",
                                        flex: 1,
                                        flexDirection: "column",
                                    }}
                                >
                                    {categoryArrays.map(array => (
                                        <View style={styles.tagRow}>
                                            {array.map(category => (
                                                <Text style={styles.tagLayout}>
                                                    {category}
                                                </Text>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.tagRow}>
                                    {categories.map(category => (
                                        <Text style={styles.tagLayout}>
                                            {category}
                                        </Text>
                                    ))}
                                </View>
                            </>
                        )}
                    </View>

                    <View
                        style={{
                            height: "40%",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View style={styles.listing}>
                            <View style={styles.row}>
                                <StarIcon size="medium" />
                                <Text>Rating: {dumpster.rating}</Text>
                            </View>
                            <View style={styles.row}>
                                <BrushIcon size="medium" />
                                <Text>Cleanliness: {dumpster.cleanliness}</Text>
                            </View>
                            <View style={styles.row}>
                                {dumpster.locked ? (
                                    <>
                                        <LockIcon size="medium" />
                                        <Text>Locked</Text>
                                    </>
                                ) : (
                                    <>
                                        <OpenLockIcon size="medium" />
                                        <Text>Unlocked</Text>
                                    </>
                                )}
                            </View>
                        </View>
                        <View style={styles.listing}>
                            <TrashIcon size="medium" />
                            <View
                                style={{
                                    width: "90%",
                                    paddingLeft: 5,
                                }}
                            >
                                <Text>
                                    Emptying schedule:
                                    {dumpster.emptyingSchedule}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listing}>
                            <PositiveIcon size="medium" />
                            <View
                                style={{
                                    width: "90%",
                                    paddingLeft: 5,
                                    flex: 1,
                                    flexDirection: "row",
                                }}
                            >
                                <Text>Store''s'' view on diving: </Text>
                                {dumpster.positiveStoreViewOnDiving ? (
                                    <Text>Positive</Text>
                                ) : !dumpster.positiveStoreViewOnDiving ? (
                                    <Text>Negative</Text>
                                ) : (
                                    <Text>Unknown</Text>
                                )}
                            </View>
                        </View>
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Text>Dumpster type: {dumpster.dumpsterType}</Text>
                        </View>

                        <View>
                            <Button
                                style={{ width: "30%" }}
                                status={"basic"}
                                size={"small"}
                                onPress={() =>
                                    navigation.navigate("ContentScreen", {
                                        screen: "ContentScreen",
                                    })
                                }
                            >
                                Contents
                            </Button>
                        </View>
                        <Text>Rate me:</Text>
                        <View style={{ width: "100%", flexDirection: "row" }}>
                            <View style={{ width: "10%" }} />
                            <View style={{ width: "80%" }}>
                                <AirbnbRating size={20} showRating={false} />
                            </View>
                            <Button
                                style={{ width: "10%", margin: 2 }}
                                appearance="ghost"
                                accessoryLeft={MessageIcon}
                                onPress={() =>
                                    navigation.navigate("CommentScreen", {
                                        screen: "CommentScreen",
                                    })
                                }
                            />
                        </View>
                    </View>
                </View>
            </Layout>
        );
    }

    function backArrow() {
        if (photoDisp - 1 >= 0) {
            onPhotoChange(photoDisp - 1);
        } else {
            onPhotoChange(photos.length - 1);
        }
    }

    function forwardArrow() {
        if (photoDisp + 1 >= photos.length) {
            onPhotoChange(0);
        } else {
            onPhotoChange(photoDisp + 1);
        }
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
    fullWidth: {
        width: "100%",
        minHeight: "100%",
        flex: 1,
        flexDirection: "column"
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
    row: {
        width: "33.3%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
    tagRow: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
});
