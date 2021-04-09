import { format } from "date-fns";
import { enGB, nb } from "date-fns/locale";
import i18n from "i18next";

// For the time being, map between i18n locale and date-fn locale like this:
const localeMap: Record<string, Locale> = {
    en: enGB,
    no: nb,
};

export function formatDate(date: Date, formatString = "PP") {
    return format(date, formatString, {
        locale: localeMap[i18n.language] || enGB,
    });
}
