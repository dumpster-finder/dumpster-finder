import "react-i18next";
import en from "../../translations/en/translation.json";

declare module "react-i18next" {
    // The type is *exactly* the namespaced translation
    type Resources = typeof en;
}
