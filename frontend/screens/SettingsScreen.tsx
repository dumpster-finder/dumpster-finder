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
import { useState } from "react";
import { ArrowRightIcon } from "../components/basicComponents/Icons";
import { StackNavigationProp } from "@react-navigation/stack";
import DropdownCard from "../components/cards/DropdownCard";
import ButtonGroupDisplay from "../components/basicComponents/ButtonGroupDisplay";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "../components/basicComponents/ToggleSwitch";
import { userIDSelector, setUserID } from "../redux/slices/userSlice";
import Constants from "expo-constants";

export default function SettingsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("settings");
    const languages = [t("en"), t("no")];
    const languageCodes = ["en", "no"];
    const distances = ["2", "5", "10", "25", "50"];
    const intervalValue = [t("visit:day"), t("visit:days"), t("visit:week")];
    const dispatch = useAppDispatch();
    const darkMode = useSelector(darkModeSelector);
    const userID = useSelector(userIDSelector);
    const nickname = useSelector(nicknameSelector);
    const language = useSelector(languageSelector);
    const visit = useSelector(visitsSelector);
    const hideNegativeRating = useSelector(hideNegativeRatingSelector);
    const radius = Math.round(useSelector(radiusSelector) / 1000);
    const [newLanguage, setNewLanguage] = useState(
        language ? languages.indexOf(language) : 0,
    );

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
    if (!radius) {
        dispatch(setRadius(1000));
    }

    if (!language) {
        dispatch(setLanguage("en"));
    }

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
                            <Text category={"h6"}>{t("setPos")} </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                            <ArrowRightIcon size="medium" />
                        </View>
                    </View>
                </Card>
                <DropdownCard
                    value={showUserID}
                    text={t("userID")}
                    onClick={setShowUserID}
                />
                {showUserID && (
                    <View style={styles.userIDContainer}>
                        <Text category="h5">{userID}</Text>
                        <Text category="c1">{t("aboutUserID")}</Text>
                    </View>
                )}
                <DropdownCard
                    value={showNick}
                    text={t("changeNick")}
                    onClick={setShowNick}
                />
                {showNick && (
                    <View style={styles.columnBorder}>
                        <Input
                            style={{ width: "90%" }}
                            size="large"
                            placeholder={t("nick")}
                            value={nicknameFieldText}
                            onChangeText={s => setNicknameFieldText(s)}
                        />
                        <Button
                            style={{ width: "50%", marginTop: 5 }}
                            onPress={() =>
                                dispatch(setNickname(nicknameFieldText))
                            }
                        >
                            {t("saveNick")}
                        </Button>
                    </View>
                )}

                <DropdownCard
                    value={showDist}
                    text={t("setDist")}
                    onClick={newValue => setShowDist(newValue)}
                />
                {showDist && (
                    <View style={{ width: "98%", alignItems: "center" }}>
                        <ButtonGroupDisplay
                            value={radiusDistance}
                            values={distances}
                            onSelect={setNewRadius}
                        />
                    </View>
                )}

                <DropdownCard
                    value={showLanguage}
                    text={t("changeLang")}
                    onClick={newValue => setShowLanguage(newValue)}
                />
                {showLanguage && (
                    <RadioGroup
                        style={{ padding: 10 }}
                        selectedIndex={newLanguage}
                        onChange={index => setNewLang(index)}
                    >
                        {languages.map((value, index) => (
                            <Radio key={index}>{value}</Radio>
                        ))}
                    </RadioGroup>
                )}
                <DropdownCard
                    value={showVis}
                    text={t("visit:visitInterval")}
                    onClick={newValue => setShowVis(newValue)}
                />
                {showVis && (
                    <View style={{ width: "98%", alignItems: "center" }}>
                        <ButtonGroupDisplay
                            value={visitInterval}
                            values={intervalValue}
                            onSelect={setInterval}
                        />
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
                        name={t("hide")}
                        checked={hideNegativeRating}
                        onChange={v => dispatch(setHideNegativeRating(v))}
                    />
                </Card>
                {Constants.manifest.extra.nodeEnv === "development" && (
                    <>
                        <Button onPress={() => dispatch(setFirstTime(true))}>
                            It's my first time!
                        </Button>
                        <Button onPress={() => dispatch(setUserID(""))}>
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

    function setNewLang(i: number) {
        setNewLanguage(i);
        dispatch(setLanguage(languageCodes[i]));
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
        alignItems: "center",
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
        width: "98%",
        alignItems: "center",
        marginVertical: 5,
    },

    dropdownView: {
        padding: 10,
    },
});
