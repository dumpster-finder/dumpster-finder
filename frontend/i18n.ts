import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import no from "./translations/no/translation.json";
import en from "./translations/en/translation.json";
import Constants from "expo-constants";

(async () => {
    await i18n.use(initReactI18next).init({
        lng: "no",
        fallbackLng: "no",
        // Makes it possible to avoid writing common: in front
        fallbackNS: "common",
        debug: Constants.manifest.extra.debug,
        // I'd argue that this should be `true` in our case
        interpolation: { escapeValue: true },
        resources: {
            en,
            no,
        },
    });
})();

export default i18n;
