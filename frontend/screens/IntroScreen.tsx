import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Layout, ViewPager, Text, Button } from "@ui-kitten/components";
import { useState } from "react";
import ButtonGroupDisplay from "../components/basicComponents/ButtonGroupDisplay";
import Advice from "../components/textComponents/Advice";
import { setFirstTime, setPosition } from "../redux/slices/configSlice";
import { useAppDispatch } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import LocationSearcher from "../components/compoundComponents/LocationSearcher";
import { StackActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
    getUserID,
    userNameSelector,
    userStatusSelector,
} from "../redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import LanguagePicker from "../components/settings/LanguagePicker";

export default function IntroScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("intro");
    const dispatch = useAppDispatch();
    const userID = useSelector(userNameSelector);
    const userIDStatus = useSelector(userStatusSelector);
    const buttons = ["1", "2", "3", "4"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <Layout style={styles.container}>
            <ViewPager
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
            >
                <Layout style={styles.tab}>
                    <Text style={styles.title} category="h3">
                        {t("appName")}
                    </Text>
                    <View style={styles.infoDisplay}>
                        <Text category="h5">
                            {/* TODO should there be a subtitle here? */}
                        </Text>
                        <Text>{t("introBlurb")}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.languageSetting}>
                        <Text category="h6">
                            {t("settings:language.title")}
                        </Text>
                        {/* TODO fix: adding more languages results in disappearances */}
                        <LanguagePicker />
                    </View>
                </Layout>
                <Layout style={styles.tab}>
                    <Text style={styles.title} category="h3">
                        {t("appName")}
                    </Text>
                    <View style={styles.infoDisplay}>
                        <Advice />
                    </View>
                </Layout>
                <Layout style={styles.userIDDisplay}>
                    <Text category="h5">
                        {userIDStatus === "succeeded"
                            ? userID
                            : userIDStatus === "failed"
                            ? t("userIDFailed")
                            : t("generatingUserID")}
                    </Text>
                    <Text style={styles.centered} category="c1">
                        {t("settings:userID.about")}
                    </Text>
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
                        onSubmit={position => {
                            dispatch(setPosition(position));
                            dispatch(setFirstTime(false));
                            navigation.dispatch(StackActions.popToTop);
                        }}
                    />
                    <View style={styles.locationBlurb}>
                        <Text category="c1">{t("locationBlurb")}</Text>
                    </View>
                </Layout>
            </ViewPager>
            <Layout style={styles.buttonContainer}>
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
        height: "100%",
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        alignSelf: "center",
        paddingTop: 5,
    },
    tab: {
        height: "90%",
        paddingTop: 40,
        paddingBottom: 20,
        flexDirection: "column",
    },
    infoDisplay: {
        flex: 1,
        marginTop: 100,
        marginHorizontal: 25,
        alignItems: "center",
    },
    divider: {
        flexGrow: 10,
    },
    languageSetting: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 25,
        marginBottom: 25,
    },
    positionSetting: {
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
        minHeight: "90%",
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
    centered: {
        textAlign: "center",
    },
    locationBlurb: {
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
});
