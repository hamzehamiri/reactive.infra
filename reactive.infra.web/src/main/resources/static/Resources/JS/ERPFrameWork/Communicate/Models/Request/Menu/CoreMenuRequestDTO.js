import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreMenuRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setParentNodeId(parentNodeId) {
        this.parentNodeId = parentNodeId;
    }

    setTextSearch(textSearch) {
        this.textSearch = textSearch;
    }

    setCoreTranslateLanguageDTO(coreTranslateLanguageDTO) {
        this.coreTranslateLanguageDTO = coreTranslateLanguageDTO;
    }
}