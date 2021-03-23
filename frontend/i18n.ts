import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import no from "./translations/no/translation.json";
import en from "./translations/en/translation.json";

(async () => {
    await i18n.use(initReactI18next).init({
        fallbackLng: "no",
        debug: true,
        interpolation: { escapeValue: false },
        resources: {
            en: {
                common: en,
            },
            no: {
                common: no,
            },
        },
    });
})();

export default i18n;
