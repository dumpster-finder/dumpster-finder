import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text, Divider } from "@ui-kitten/components";
import {
    TrashIcon,
    StarIcon,
    NegativeIcon,
    PositiveIcon,
    LockIcon,
    OpenLockIcon,
    BrushIcon,
} from "../components/Icons";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
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

                    <View style={{ height: 150, marginVertical: 5 }}>
                        <PhotoDisplay photoList={photos} />
                    </View>

                    <View style={styles.box}>
                        <View style={styles.boxRow}>
                            <StarIcon size="small" />
                            <Text style={styles.infoText}>
                                Rating: {dumpster.rating.toFixed(1)}
                            </Text>
                        </View>
                        <View style={styles.boxRow}>
                            <BrushIcon size="small" />
                            <Text style={styles.infoText}>
                                Cleanliness: {dumpster.cleanliness}
                            </Text>
                        </View>
                        <View style={styles.boxRow}>
                            {dumpster.locked ? (
                                <>
                                    <LockIcon size="small" />
                                    <Text style={styles.infoText}>Locked</Text>
                                </>
                            ) : (
                                <>
                                    <OpenLockIcon size="small" />
                                    <Text style={styles.infoText}>
                                        Unlocked
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        {dumpster.positiveStoreViewOnDiving ? (
                            <>
                                <PositiveIcon size="small" />
                                <Text style={styles.infoText}>
                                    Store's view on dumpster diving:{" "}
                                </Text>
                                <Text>Positive</Text>
                            </>
                        ) : dumpster.positiveStoreViewOnDiving === null ? (
                            <>
                                <PositiveIcon size="small" />
                                <Text style={styles.infoText}>
                                    Store's view on dumpster diving:{" "}
                                </Text>
                                <Text>Neutral</Text>
                            </>
                        ) : (
                            <>
                                <NegativeIcon size="small" />
                                <Text style={styles.infoText}>
                                    Store's view on dumpster diving:{" "}
                                </Text>
                                <Text>Negative</Text>
                            </>
                        )}
                    </View>
                    <View style={styles.infoRow}>
                        <TrashIcon size="small" />
                        <Text style={styles.infoText}>
                            Emptying schedule: {dumpster.emptyingSchedule}
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
                                        key={index}
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
                                style={{ width: "80%" }}
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
                                style={{ width: "80%" }}
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
                            <AirbnbRating
                                size={20}
                                showRating={false}
                                defaultRating={0}
                            />
                        </View>
                    </View>
                </ScrollView>
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
    infoRow: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 5,
        marginHorizontal: 5,
        flexWrap: "wrap",
    },
    infoText: {
        paddingLeft: 5,
        flexWrap: "wrap",
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
    box: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: 5,
    },

    boxRow: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },
});
