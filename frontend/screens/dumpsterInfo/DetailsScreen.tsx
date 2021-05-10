import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import {
    addDumpster,
    currentDumpsterSelector,
    setCurrentDumpster,
} from "../../redux/slices/dumpsterSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import PhotoDisplay from "../../components/compoundComponents/PhotoDisplay";
import { useTranslation } from "react-i18next";
import CategoryInfo from "../../components/dumpsterInfo/CategoryInfo";
import ExtraInfo from "../../components/dumpsterInfo/ExtraInfo";
import InfoRow from "../../components/dumpsterInfo/InfoRow";
import GeneralInfo from "../../components/dumpsterInfo/GeneralInfo";
import { DumpsterService, RatingService, VisitService } from "../../services";
import { useAppDispatch } from "../../redux/store";
import usePhotos from "../../hooks/usePhotos";
import { useState } from "react";
import { subDays, subHours } from "date-fns";
import {
    dumpsterRatingsSelector,
    positionSelector,
    registeredVisitsSelector,
    visitsSelector,
    setDumpsterRating,
} from "../../redux/slices/configSlice";
import Message from "../../utils/Message";
import { distance } from "../../utils/distance";
import { PendingButtonIcon } from "../../components/basicComponents/Icons";

/**
 * Displays the details of the selected dumpster
 * @param navigation
 *
 */
export default function DetailsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const dispatch = useAppDispatch();
    const visitDate = useSelector(visitsSelector);
    const { t }: { t: (s: string) => string } = useTranslation("details");
    const dumpster = useSelector(currentDumpsterSelector);
    const { dumpsterID } = dumpster;
    const photos = usePhotos();
    const [visits, setVisits] = useState(dumpster ? dumpster.visits : 0);
    const currentRating = useSelector(dumpsterRatingsSelector)[dumpsterID] || 0;
    const lastVisit = useSelector(registeredVisitsSelector)[dumpsterID];
    const position = useSelector(positionSelector);

    const [visitDisabled, setVisitDisabled] = useState(
        lastVisit ? subHours(new Date(), 4) <= lastVisit || false : false,
    );

    const [visitPending, setVisitPending] = useState(false);

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
                    <Button
                        disabled={visitPending || visitDisabled}
                        accessoryLeft={
                            visitPending ? PendingButtonIcon : undefined
                        }
                        style={{
                            alignSelf: "center",
                        }}
                        size="small"
                        status="warning"
                        onPress={visit}
                    >
                        {t("visit:visitbtn")}
                    </Button>
                    {visitDisabled && (
                        <Text
                            category={"c1"}
                            style={{
                                marginVertical: 5,
                                alignSelf: "center",
                            }}
                        >
                            {t("visit:disabled")}
                        </Text>
                    )}

                    <CategoryInfo dumpster={dumpster} />
                    <GeneralInfo dumpster={dumpster} />
                    <InfoRow dumpster={dumpster} />
                    <ExtraInfo dumpster={dumpster} />

                    <View style={styles.buttonRow}>
                        <Button
                            style={styles.button}
                            size="small"
                            onPress={() => navigation.navigate("ContentScreen")}
                        >
                            {t("content")}
                        </Button>
                        <Button
                            style={styles.button}
                            size="small"
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
                                defaultRating={currentRating}
                                onFinishRating={handleRating}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        );
    }

    async function handleRating(rating: number) {
        try {
            if (currentRating) {
                // found a stored rating
                await RatingService.updateRating(dumpsterID, rating);
            } else {
                // user has never rated a dumpster before
                await RatingService.rate(dumpsterID, rating);
            }
            dispatch(setDumpsterRating({ dumpsterID, rating }));
            await getDumpster();
        } catch (e) {
            Message.error(e, "Could not rate dumpster");
        }
    }

    async function visit() {
        setVisits(visits + 1);
        setVisitPending(true);
        try {
            await VisitService.addOne(dumpsterID);
            await getDumpster();
            setVisitDisabled(true);
        } catch (e) {
            Message.error(e, "Could not register visit");
            setVisits(visits);
        }
        setVisitPending(false);
    }

    async function getDumpster() {
        const visitSinceDate = subDays(
            new Date(),
            visitDate === 0 ? 1 : visitDate === 1 ? 3 : 7,
        )
            .toISOString()
            .split("T")[0];
        if (dumpster) {
            try {
                let updatedDumpster = await DumpsterService.getDumpster(
                    dumpsterID,
                    visitSinceDate,
                );
                // Calculate distance to dumpster manually, to avoid calculating it again
                updatedDumpster.distance = distance(
                    position,
                    updatedDumpster.position,
                );
                dispatch(setCurrentDumpster(updatedDumpster));
                dispatch(addDumpster(updatedDumpster));
            } catch (e) {
                Message.error(e, "Could not add visit");
            }
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
