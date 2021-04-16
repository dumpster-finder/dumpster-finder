import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { currentDumpsterSelector } from "../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import PhotoDisplay from "../components/compoundComponents/PhotoDisplay";
import { useTranslation } from "react-i18next";
import CategoryInfo from "../components/dumpsterInfo/CategoryInfo";
import ExtraInfo from "../components/dumpsterInfo/ExtraInfo";
import InfoRow from "../components/dumpsterInfo/InfoRow";
import GeneralInfo from "../components/dumpsterInfo/GeneralInfo";
import usePhotos from "../hooks/usePhotos";

export default function DetailsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    const dumpster = useSelector(currentDumpsterSelector);
    const photos = usePhotos();
    const visitors = 5;

    if (!dumpster) {
        return (
            <Layout style={styles.container}>
                <Text category="h1">{t("somethingWrong")}</Text>
            </Layout>
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
                    <View style={{ height: 150, marginVertical: 5 }}>
                        <PhotoDisplay
                            photoList={photos}
                            onPress={() =>
                                navigation.navigate("PhotoGalleryScreen")
                            }
                        />
                    </View>

                    {/*TODO this might end badly on really small screens!*/}

                    <CategoryInfo dumpster={dumpster} />
                    <GeneralInfo dumpster={dumpster} />
                    <Text
                        style={{
                            justifyContent: "flex-start",
                        }}
                    >
                        {t("visit:part1")} {visitors} {t("visit:part2")}
                    </Text>
                    <InfoRow dumpster={dumpster} />

                    <ExtraInfo dumpster={dumpster} />

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
                    <Button
                        style={{
                            alignSelf: "center",
                        }}
                        size="small"
                    >
                        {t("visit:visitbtn")}
                    </Button>
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
    view: {
        flexDirection: "row",
        alignItems: "center",
    },
});
