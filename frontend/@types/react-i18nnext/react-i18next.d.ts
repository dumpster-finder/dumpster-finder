import "react-i18next";
import en from "../../translations/en/translation.json";
import { i18n, TFunctionKeys } from "i18next";

declare module "react-i18next" {
    // The type is *exactly* the namespaced translation
    export type Resources = typeof en;
    // Unscrew t function types
    // export type TFunction = (s: TFunctionKeys) => string;
    // (doesn't work)
}
