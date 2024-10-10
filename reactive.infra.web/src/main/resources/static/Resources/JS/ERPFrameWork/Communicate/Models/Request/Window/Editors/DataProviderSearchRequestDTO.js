import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class DataProviderSearchRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreWindowTabId(coreWindowTabId) {
        this.coreWindowTabId = coreWindowTabId;
    }

    setCoreWindowTabFieldId(coreWindowTabFieldId) {
        this.coreWindowTabFieldId = coreWindowTabFieldId;
    }

    setCoreProcessParamId(coreProcessParamId) {
        this.coreProcessParamId = coreProcessParamId;
    }

    setRawText(rawText) {
        this.rawText = rawText;
    }

    setFieldValues(fieldValues) {
        this.fieldValues = fieldValues;
    }

    setPagingDTO(pagingDTO) {
        this.pagingDTO = pagingDTO;
    }
}