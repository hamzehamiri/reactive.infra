import {BaseModel} from "../../Shared/Common/BaseModel.js";

export default class LanguageModel extends BaseModel {
    constructor() {
        super();
    }

    setLocaleName(localeName) {
        this.localeName = localeName;
    }

    setLanguage(language) {
        this.language = language;
    }

    setIsRTL(rtl) {
        this.rtl = rtl;
    }

    getLocaleName() {
        return this.localeName;
    }

    getLanguage() {
        return this.language;
    }

    getIsRTL() {
        return this.rtl;
    }
}