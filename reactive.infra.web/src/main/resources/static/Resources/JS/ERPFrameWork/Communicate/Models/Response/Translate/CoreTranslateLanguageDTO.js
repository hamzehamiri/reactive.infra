import CommonCountryDTO from "./CommonCountryDTO.js";
import LanguageModel from "../../../../../UIFrameWork/HTML/ThemeLanguage/LanguageModel.js";

export default class CoreTranslateLanguageDTO extends LanguageModel {
    constructor() {
        super();
    }

    setCommonCountry(commonCountry) {
        this.commonCountry = commonCountry;
    }

    getCommonCountry() {
        if (this.commonCountry) {
            return new CommonCountryDTO().applyData(this.commonCountry);
        } else {
            return null;
        }
    }
}