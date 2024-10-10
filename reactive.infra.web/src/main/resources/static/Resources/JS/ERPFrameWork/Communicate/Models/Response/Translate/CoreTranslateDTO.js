import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreTranslateLanguageDTO from "./CoreTranslateLanguageDTO.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class CoreTranslateDTO extends BaseModel {
    constructor() {
        super();
    }

    setTranslateValue(translateValue) {
        this.translateValue = translateValue;
    }

    setCoreTranslateLanguageMetadataDTO(coreTranslateLanguageMetadataDTO) {
        if (coreTranslateLanguageMetadataDTO instanceof CoreTranslateLanguageDTO) {
            this.coreTranslateLanguageMetadataDTO = coreTranslateLanguageMetadataDTO;
        }
    }

    setCoreAllElementDTO(coreAllElementDTO) {
        this.coreAllElementDTO = coreAllElementDTO
    }

    setCoreGeneralRecordDTO(coreGeneralRecordDTO) {
        this.coreGeneralRecordDTO = coreGeneralRecordDTO;
    }

    getTranslateValue() {
        return this.translateValue;
    }

    getCoreTranslateLanguageMetadataDTO() {
        return this.coreTranslateLanguageMetadataDTO;
    }

    getCoreAllElementDTO() {
        if (this.coreAllElementDTO && !(this.coreAllElementDTO.constructor instanceof BaseModel)) {
            this.coreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTO);
        }
        return this.coreAllElementDTO;
    }

    getCoreGeneralRecordDTO() {
        return this.coreGeneralRecordDTO;
    }
}