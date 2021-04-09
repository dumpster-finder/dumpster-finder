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
} from "../redux/slices/configSlice";
import { useAppDispatch } from "../redux/store";
import { useState } from "react";
import { ArrowRightIcon } from "../components/Icons";
import { StackNavigationProp } from "@react-navigation/stack";
import DropdownCard from "../components/DropdownCard";
import ButtonGroupDisplay from "../components/ButtonGroupDisplay";
import ToggleSwitch from "../components/ToggleSwitch";

export default function SettingsScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>;
}) {
    const languages = ["English", "Norwegian", "German", "French", "Spanish"];
    const languageCodes = ["en", "no", "de", "fr", "sp"];
    const distances = ["2", "5", "10", "25", "50"];
    const dispatch = useAppDispatch();
    const darkMode = useSelector(darkModeSelector);
    const nickname = useSelector(nicknameSelector);
    const language = useSelector(languageSelector);
    const hideNegativeRating = useSelector(hideNegativeRatingSelector);
    console.log(hideNegativeRating);
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
                            <Text category={"h6"}>Set position </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                            <ArrowRightIcon size="medium" />
                        </View>
                    </View>
                </Card>
                <DropdownCard
                    value={showNick}
                    text={"Change nickname"}
                    onClick={newValue => setShowNick(newValue)}
                />
                {showNick && (
                    <View style={styles.columnBorder}>
                        <Input
                            style={{ width: "90%" }}
                            size="large"
                            placeholder={"Nickname"}
                            value={nicknameFieldText}
                            onChangeText={s => setNicknameFieldText(s)}
                        />
                        <Button
                            style={{ width: "50%", marginTop: 5 }}
                            onPress={() =>
                                dispatch(setNickname(nicknameFieldText))
                            }
                        >
                            Save nickname
                        </Button>
                    </View>
                )}

                <DropdownCard
                    value={showDist}
                    text={"Set distance (km)"}
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
                    text={"Change language"}
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
                    <ToggleSwitch
                        name={"Dark mode"}
                        checked={darkMode}
                        onChange={v => dispatch(setDarkMode(v))}
                    />
                </Card>
                <Card>
                    <ToggleSwitch
                        name={"Hide negative rated comments"}
                        checked={hideNegativeRating}
                        onChange={v => dispatch(setHideNegativeRating(v))}
                    />
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
