import "react-i18next";
import no from "../../translations/no/translation.json";
import en from "../../translations/en/translation.json";

declare module "react-i18next" {
    interface Resources {
        no: typeof no;
        en: typeof en;
    }
}
