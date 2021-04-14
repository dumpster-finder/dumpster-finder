import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import PhotoDisplay from "../components/PhotoDisplay";
import DumpsterInfo from "../components/DumpsterInfo";
import { useTranslation } from "react-i18next";
import { CommentButtonIcon } from "../components/Icons";

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
                            {t(`dumpsterType:${dumpster.dumpsterType}`)}
                            {" – "}
                            {t(`storeType:${dumpster.storeType}`)}
                        </Text>
                    </View>

                    {/*TODO this might end badly on really small screens!*/}
                    <View style={{ height: 150, marginVertical: 5 }}>
                        <PhotoDisplay photoList={photos} />
                    </View>
                    <DumpsterInfo dumpster={dumpster} />

                    <View style={styles.buttonRow}>
                        <Button
                            style={styles.button}
                            size="small"
                            status="info"
                            onPress={() => navigation.navigate("ContentScreen")}
                        >
                            {t("content")}
                        </Button>
                        <Button
                            style={styles.button}
                            size="small"
                            status="info"
                            onPress={() => navigation.navigate("CommentScreen")}
                        >
                            {t("comments")}
                        </Button>
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
        paddingHorizontal: 12,
        minHeight: "100%",
    },
    row: {
        flexDirection: "row",
    },
    buttonRow: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        marginHorizontal: 10,
    },
});
