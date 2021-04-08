import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Layout,
    Text,
    Toggle,
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
    setDarkMode,
    setNickname,
    setRadius,
    setLanguage,
    setFirstTime,
} from "../redux/slices/configSlice";
import { useAppDispatch } from "../redux/store";
import { useState } from "react";
import { ArrowRightIcon } from "../components/Icons";
import { StackNavigationProp } from "@react-navigation/stack";
import DropdownCard from "../components/DropdownCard";
import ButtonGroupDisplay from "../components/ButtonGroupDisplay";
import { useTranslation } from "react-i18next";

export default function SettingsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const { t }: { t: (s: string) => string } = useTranslation("settings");
    const languages = [t("en"), t("no"), t("de"), t("fr"), t("es")];
    const languageCodes = ["en", "no", "de", "fr", "sp"];
    const distances = ["2", "5", "10", "25", "50"];
    const dispatch = useAppDispatch();
    const darkMode = useSelector(darkModeSelector);
    const nickname = useSelector(nicknameSelector);
    const language = useSelector(languageSelector);
    const diameter = Math.round(useSelector(radiusSelector) / 1000);
    const [newLanguage, setNewLanguage] = useState(
        language ? languages.indexOf(language) : 0,
    );
    const [showNick, setShowNick] = useState(false);
    const [showDist, setShowDist] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [radiusDistance, setRadiusDistance] = useState(
        diameter ? distances.indexOf(diameter.toString()) : 1,
    );
    const [nicknameFieldText, setNicknameFieldText] = useState(nickname);

    if (!diameter) {
        dispatch(setRadius(1000));
    }

    if (!language) {
        dispatch(setLanguage("English"));
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
                    value={showNick}
                    text={t("changeNick")}
                    onClick={newValue => setShowNick(newValue)}
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

                <Card>
                    <View style={styles.row}>
                        <View
                            style={{ width: "50%", justifyContent: "center" }}
                        >
                            <Text category={"h6"}>{t("darkMode")}</Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                            <Toggle
                                checked={darkMode}
                                onChange={v => dispatch(setDarkMode(v))}
                            />
                        </View>
                    </View>
                </Card>
                <Button onPress={() => dispatch(setFirstTime(true))}>
                    Reset
                </Button>
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
