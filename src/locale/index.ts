import { LocaleType } from "../define/CommonType";

import ko from "./ko/template";
import en from "./en/template";

export default (localeCode: LocaleType) => {
    switch(localeCode) {
        default:
        case "ko":
            return ko;
        case "en":
            return en;
    }
};