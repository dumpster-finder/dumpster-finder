import { Radio, RadioGroup } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { languageSelector, setLanguage } from "../../redux/slices/configSlice";
import { useAppDispatch } from "../../redux/store";

/**
 * Ratio buttons with different languages as values
 */
export default function() {
    const dispatch = useAppDispatch();
    const language = useSelector(languageSelector);
    const { t }: { t: (s: string) => string } = useTranslation("settings");
    const languages = [t("language.en"), t("language.no")];
    const languageCodes = ["en", "no"];
    const [newLanguage, setNewLanguage] = useState(
        language ? languages.indexOf(language) : 0,
    );

    useEffect(() => {
        if (!language) dispatch(setLanguage("en"));
    });
    return (
        <RadioGroup
            style={styles.languageButtons}
            selectedIndex={newLanguage}
            onChange={handleChange}
        >
            {languages.map((value, index) => (
                <Radio key={index}>{value}</Radio>
            ))}
        </RadioGroup>
    );

    function handleChange(i: number) {
        setNewLanguage(i);
        dispatch(setLanguage(languageCodes[i]));
    }
}

const styles = StyleSheet.create({
    languageButtons: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
