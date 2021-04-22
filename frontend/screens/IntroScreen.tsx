import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout, ViewPager, Text, Button } from "@ui-kitten/components";
import { useState } from "react";
import ButtonGroupDisplay from "../components/basicComponents/ButtonGroupDisplay";
import Advice from "../components/textComponents/Advice";
import IconExplanation from "../components/textComponents/IconExplanation";
import { setFirstTime, setPosition } from "../redux/slices/configSlice";
import { useAppDispatch } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import LocationSearcher from "../components/compoundComponents/LocationSearcher";
import { StackActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
    getUserID,
    userIDSelector,
    userStatusSelector,
} from "../redux/slices/userSlice";
import { useTranslation } from "react-i18next";

export default function IntroScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("intro");
    const dispatch = useAppDispatch();
    const userID = useSelector(userIDSelector);
    const userIDStatus = useSelector(userStatusSelector);
    const buttons = ["1", "2", "3", "4"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <Layout>
            <ViewPager
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
            >
                <Layout style={styles.tab}>
                    <Text
                        style={{ alignSelf: "center", paddingTop: 5 }}
                        category="h3"
                    >
                        Dumpster Finder
                    </Text>
                    <View style={styles.infoDisplay}>
                        <Advice />
                    </View>
                </Layout>
                <Layout style={styles.tab}>
                    <Text
                        style={{ alignSelf: "center", paddingTop: 5 }}
                        category="h3"
                    >
                        Dumpster Finder
                    </Text>
                    <ScrollView>
                        <View style={styles.infoDisplay}>
                            <IconExplanation />
                        </View>
                    </ScrollView>
                </Layout>
                <Layout style={styles.userIDDisplay}>
                    <Text category="h5">
                        {userIDStatus === "succeeded"
                            ? userID
                            : userIDStatus === "failed"
                            ? t("userIDFailed")
                            : t("generatingUserID")}
                    </Text>
                    <Text category="c1">{t("settings:aboutUserID")}</Text>
                    <Button
                        status="primary"
                        style={styles.retryButton}
                        disabled={userIDStatus !== "failed"}
                        onPress={() => dispatch(getUserID())}
                    >
                        {t("retry")}
                    </Button>
                </Layout>
                <Layout style={styles.positionSetting}>
                    <LocationSearcher
                        onSubmit={place => {
                            dispatch(setPosition(place.position));
                            dispatch(setFirstTime(false));
                            navigation.dispatch(StackActions.popToTop);
                        }}
                    />
                </Layout>
            </ViewPager>
            <Layout style={styles.container}>
                <ButtonGroupDisplay
                    value={selectedIndex}
                    values={buttons}
                    onSelect={setSelectedIndex}
                />
            </Layout>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    tab: {
        paddingTop: "10%",
        width: "100%",
        height: "90%",
        paddingVertical: "10%",
    },
    infoDisplay: {
        paddingVertical: 100,
        alignItems: "center",
    },
    positionSetting: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: "10%",
    },
    userIDDisplay: {
        justifyContent: "center",
        alignItems: "center",
        height: "90%",
    },
    retryButton: {
        minWidth: "25%",
        marginTop: 8,
    },
});
