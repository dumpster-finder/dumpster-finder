import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import {
    addDumpster,
    currentDumpsterSelector,
    setCurrentDumpster,
} from "../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import PhotoDisplay from "../components/compoundComponents/PhotoDisplay";
import { useTranslation } from "react-i18next";
import CategoryInfo from "../components/dumpsterInfo/CategoryInfo";
import ExtraInfo from "../components/dumpsterInfo/ExtraInfo";
import InfoRow from "../components/dumpsterInfo/InfoRow";
import GeneralInfo from "../components/dumpsterInfo/GeneralInfo";
import { DumpsterService, VisitService } from "../services";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";

export default function DetailsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("details");
    const dispatch = useAppDispatch();
    const dumpster = useSelector(currentDumpsterSelector);
    // @ts-ignore
    const [visits, setVisits] = useState(dumpster.visits || 0);
    const photos = [
        "https://images1.westword.com/imager/u/745xauto/11871566/cover_no_copy.jpg",
        "https://cdn.shopify.com/s/files/1/1133/3328/products/dumpster-2020_600x.jpg?v=1594250607",
        "https://i.pinimg.com/originals/87/b2/ec/87b2ece63b4075dd6b294a4dc153f18c.jpg",
    ];

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
                        <PhotoDisplay photoList={photos} />
                    </View>

                    {/*TODO this might end badly on really small screens!*/}

                    <CategoryInfo dumpster={dumpster} />
                    <GeneralInfo dumpster={dumpster} />
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
                        onPress={visit}
                    >
                        {t("visit:visitbtn")}
                    </Button>
                </ScrollView>
            </Layout>
        );
    }

    async function visit() {
        setVisits(visits + 1);
        if (dumpster) {
            const aaa = await VisitService.addOne(
                dumpster.dumpsterID,
                "temp1",
            ).then(getDumpster);
        }
    }

    async function getDumpster() {
        if (dumpster) {
            const updatedDumpster = DumpsterService.getDumpster(
                dumpster.dumpsterID,
            )
                //.then(data => dispatch(setCurrentDumpster({ data })))
                /*.then(data =>
                    dispatch(
                        // @ts-ignore
                        addDumpster({ data }),
                    ),
                )

                 */
                .catch(e => console.error("Could not add visit", e));
        }
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
