import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreTranslateLanguageDTO from "../../Response/Translate/CoreTranslateLanguageDTO.js";

export default class CoreFilterRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreFilterRequestElementRecordDTOArray(coreFilterRequestElementRecordDTOArray) {
        this.coreFilterRequestElementRecordDTOArray = coreFilterRequestElementRecordDTOArray;
    }

    setCoreTranslateLanguageDTO(coreTranslateLanguageDTO) {
        this.coreTranslateLanguageDTO = coreTranslateLanguageDTO;
    }

    getCoreTranslateLanguageDTO() {
        if (this.coreTranslateLanguageDTO && !(this.coreTranslateLanguageDTO.constructor instanceof BaseModel)) {
            this.coreTranslateLanguageDTO = ConvertUtil.ConvertGeneral(CoreTranslateLanguageDTO, this.coreTranslateLanguageDTO);
        }
        return this.coreTranslateLanguageDTO;
    }
}