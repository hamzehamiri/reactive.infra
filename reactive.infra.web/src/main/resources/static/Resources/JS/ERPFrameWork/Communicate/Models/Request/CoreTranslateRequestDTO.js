import {BaseModel} from "../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreTranslateLanguageDTO from "../Response/Translate/CoreTranslateLanguageDTO.js";

export default class CoreTranslateRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setRegisterKey(registerKey) {
        this.registerKey = registerKey;
    }

    setCoreTranslateLanguageDTO(coreTranslateLanguageDTO) {
        if (coreTranslateLanguageDTO instanceof CoreTranslateLanguageDTO) {
            this.coreTranslateLanguageDTO = coreTranslateLanguageDTO;
        }
    }
}