import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Layout,
    Text,
    Input,
    Card,
    RadioGroup,
    Radio,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import {
    darkModeSelector,
    nicknameSelector,
    radiusSelector,
    languageSelector,
    hideNegativeRatingSelector,
    setDarkMode,
    setNickname,
    setRadius,
    setLanguage,
    setFirstTime,
    setHideNegativeRating,
    visitsSelector,
    setVisits,
} from "../redux/slices/configSlice";
import { useAppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "../components/basicComponents/Icons";
import { StackNavigationProp } from "@react-navigation/stack";
import DropdownCard from "../components/cards/DropdownCard";
import ButtonGroupDisplay from "../components/basicComponents/ButtonGroupDisplay";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "../components/basicComponents/ToggleSwitch";
import { userNameSelector, setUserName } from "../redux/slices/userSlice";
import Constants from "expo-constants";
import LanguagePicker from "../components/settings/LanguagePicker";

export default function SettingsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("settings");
    const distances = ["2", "5", "10", "25", "50"];
    const intervalValue = [t("visit:day"), t("visit:days"), t("visit:week")];
    const dispatch = useAppDispatch();
    const darkMode = useSelector(darkModeSelector);
    const userName = useSelector(userNameSelector);
    const nickname = useSelector(nicknameSelector);
    const visit = useSelector(visitsSelector);
    const hideNegativeRating = useSelector(hideNegativeRatingSelector);
    const radius = Math.round(useSelector(radiusSelector) / 1000);
    const [showUserID, setShowUserID] = useState(false);
    const [showNick, setShowNick] = useState(false);
    const [showDist, setShowDist] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [radiusDistance, setRadiusDistance] = useState(
        radius ? distances.indexOf(radius.toString()) : 1,
    );
    const [nicknameFieldText, setNicknameFieldText] = useState(nickname);
    const [showVis, setShowVis] = useState(false);
    const [visitInterval, setVisitInterval] = useState(visit);
    useEffect(() => {
        if (!radius) dispatch(setRadius(1000));
    });

    return (
        <Layout style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Card
                    onPress={() => {
                        navigation.navigate("SetPositionScreen", {
                            screen: "SetPositionScreen",
                        });
                    }}
                >
                    <View style={styles.row}>
                        <View style={{ width: "50%" }}>
                            <Text category={"h6"}>{t("setPosition")} </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                            <ArrowRightIcon size="medium" />
                        </View>
                    </View>
                </Card>
                <DropdownCard
                    value={showUserID}
                    text={t("userID.title")}
                    onClick={setShowUserID}
                />
                {showUserID && (
                    <View style={styles.userIDContainer}>
                        <Text style={styles.centeredText} category="h5">
                            {userName}
                        </Text>
                        <Text category="c1">{t("userID.about")}</Text>
                    </View>
                )}
                <DropdownCard
                    value={showNick}
                    text={t("nickname.title")}
                    onClick={setShowNick}
                />
                {showNick && (
                    <View style={styles.columnBorder}>
                        <Input
                            size="large"
                            placeholder={t("nickname.placeholder")}
                            value={nicknameFieldText}
                            onChangeText={s => setNicknameFieldText(s)}
                        />
                        <Text style={styles.centeredText} category="c1">
                            {t("nickname.about")}
                        </Text>
                        <Button
                            style={{ minWidth: "53%", marginTop: 5 }}
                            onPress={() =>
                                dispatch(setNickname(nicknameFieldText))
                            }
                        >
                            {t("nickname.save")}
                        </Button>
                    </View>
                )}

                <DropdownCard
                    value={showDist}
                    text={t("distance.title")}
                    onClick={newValue => setShowDist(newValue)}
                />
                {showDist && (
                    <View style={styles.buttonGroupContainer}>
                        <ButtonGroupDisplay
                            value={radiusDistance}
                            values={distances}
                            onSelect={setNewRadius}
                        />
                        <Text style={styles.centeredText} category="c1">
                            {t("distance.about")}
                        </Text>
                    </View>
                )}

                <DropdownCard
                    value={showLanguage}
                    text={t("language.title")}
                    onClick={newValue => setShowLanguage(newValue)}
                />
                {showLanguage && <LanguagePicker />}
                <DropdownCard
                    value={showVis}
                    text={t("visitInterval.title")}
                    onClick={newValue => setShowVis(newValue)}
                />
                {showVis && (
                    <View style={styles.buttonGroupContainer}>
                        <ButtonGroupDisplay
                            value={visitInterval}
                            values={intervalValue}
                            onSelect={setInterval}
                        />
                        <Text style={styles.centeredText} category="c1">
                            {t("visitInterval.about")}
                        </Text>
                    </View>
                )}
                <Card>
                    <ToggleSwitch
                        name={t("darkMode")}
                        checked={darkMode}
                        onChange={v => dispatch(setDarkMode(v))}
                    />
                </Card>
                <Card>
                    <ToggleSwitch
                        name={t("hideNegativeComments")}
                        checked={hideNegativeRating}
                        onChange={v => dispatch(setHideNegativeRating(v))}
                    />
                </Card>
                {Constants.manifest.extra.nodeEnv === "development" && (
                    <>
                        <Button onPress={() => dispatch(setFirstTime(true))}>
                            It's my first time!
                        </Button>
                        <Button onPress={() => dispatch(setUserName(""))}>
                            Reset user ID
                        </Button>
                    </>
                )}
            </ScrollView>
        </Layout>
    );

    function setNewRadius(i: number) {
        setRadiusDistance(i);
        dispatch(setRadius(1000 * parseInt(distances[i])));
    }

    function setInterval(i: number) {
        setVisitInterval(i);
        dispatch(setVisits(i));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    userIDContainer: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        alignItems: "center",
    },
    centeredText: {
        textAlign: "center",
    },
    scrollView: {
        width: "100%",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    rowBorder: {
        flex: 1,
        flexDirection: "row",
        width: "98%",
    },
    columnBorder: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 14,
        alignItems: "center",
        marginVertical: 6,
    },
    buttonGroupContainer: {
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    dropdownView: {
        padding: 10,
    },
});
