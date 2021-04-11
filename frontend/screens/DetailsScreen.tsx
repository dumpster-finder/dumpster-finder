import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text, Divider } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import PhotoDisplay from "../components/PhotoDisplay";
import DumpsterInfo from "../components/DumpsterInfo";
import { useTranslation } from "react-i18next";

export default function DetailsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    const dumpster = useSelector(currentDumpsterSelector);
    const photos = [
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
    ];

    if (!dumpster) {
        return (
            <View style={styles.container}>
                <Text category="h1">{t("somethingWrong")}</Text>
            </View>
        );
    } else {
        const { categories } = dumpster;

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
                        <Text category="h6">
                            {t(`storeType:${dumpster.storeType}`)}
                        </Text>
                    </View>

                    {/*TODO this might end badly on really small screens!*/}
                    <View style={{ height: 150, marginVertical: 5 }}>
                        <PhotoDisplay photoList={photos} />
                    </View>
                    <DumpsterInfo dumpster={dumpster} />

                    <Text style={{ alignSelf: "center" }}>
                        {t("categories")}
                    </Text>
                    <View style={styles.tagRow}>
                        {categories.map((category, index) => (
                            <Layout level="3" key={index} style={styles.tagBox}>
                                <Text>{t(`categories:${category}`)}</Text>
                            </Layout>
                        ))}
                    </View>

                    <View style={styles.row}>
                        <View style={styles.buttons}>
                            <Button
                                style={{ width: "80%" }}
                                size="small"
                                onPress={() =>
                                    navigation.navigate("ContentScreen")
                                }
                            >
                                {t("content")}
                            </Button>
                        </View>
                        <View style={styles.buttons}>
                            <Button
                                style={{ width: "80%" }}
                                size="small"
                                onPress={() =>
                                    navigation.navigate("CommentScreen")
                                }
                            >
                                {t("comments")}
                            </Button>
                        </View>
                    </View>

                    <Text style={{ alignSelf: "center" }}>
                        {t("setRating")}
                    </Text>
                    <View style={styles.row}>
                        <View style={{ width: "10%" }} />
                        <View style={{ width: "80%", marginBottom: 10 }}>
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
        alignItems: "center",
        justifyContent: "center",
    },
    scrollView: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
    },
    buttons: {
        paddingVertical: 10,
        width: "50%",
        alignItems: "center",
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

    tagRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexWrap: "wrap",
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
    tagBox: {
        paddingBottom: 5,
        paddingTop: 3,
        paddingHorizontal: 7,
        borderRadius: 15,
        marginRight: 3,
        marginBottom: 4,
    },
});
