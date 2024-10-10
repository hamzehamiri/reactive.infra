import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreTranslateLanguageDTO from "../../Response/Translate/CoreTranslateLanguageDTO.js";
import CoreProcessRequestStatusDTO from "./CoreProcessRequestStatusDTO.js";
import RecordModelDTO from "../../Response/Window/Tab/RecordModelDTO.js";

export default class CoreProcessRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreProcessParamValueMap(coreProcessParamValueMap) {
        this.coreProcessParamValueMap = coreProcessParamValueMap;
    }

    getCoreTranslateLanguageDTO() {
        if (this.coreTranslateLanguageDTO && !(this.coreTranslateLanguageDTO.constructor instanceof BaseModel)) {
            this.coreTranslateLanguageDTO = ConvertUtil.ConvertGeneral(CoreTranslateLanguageDTO, this.coreTranslateLanguageDTO);
        }
        return this.coreTranslateLanguageDTO;
    }

    setRecordModelDTOList(recordModelDTOList) {
        this.recordModelDTOList = recordModelDTOList;
    }

    getRecordModelDTOList() {
        if (this.recordModelDTOList && !((this.recordModelDTOList instanceof Array && !(this.recordModelDTOList[0] instanceof BaseModel)))) {
            this.recordModelDTOList = ConvertUtil.ConvertGeneralWithArray(RecordModelDTO, this.recordModelDTOList);
        }
        return this.recordModelDTOList;
    }

    setRecordId(recordId) {
        this.recordId = recordId;
    }

    setCoreAllElementDTO(coreAllElementDTO) {
        this.coreAllElementDTO = coreAllElementDTO;
    }

    setCoreProcessRequestStatusDTO(coreProcessRequestStatusDTO) {
        this.coreProcessRequestStatusDTO = coreProcessRequestStatusDTO;
    }

    getCoreProcessRequestStatusDTO() {
        if (this.coreProcessRequestStatusDTO && !(this.coreProcessRequestStatusDTO instanceof BaseModel)) {
            this.coreProcessRequestStatusDTO = ConvertUtil.ConvertGeneral(CoreProcessRequestStatusDTO, this.coreProcessRequestStatusDTO);
        }
        return this.coreProcessRequestStatusDTO;
    }
}