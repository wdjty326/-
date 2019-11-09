import { LocaleType } from "../define/CommonType";

import ko from "./ko/template";

export default (localeCode: LocaleType) => {
    switch(localeCode) {
        default:
        case "ko":
            return ko;
    }
};