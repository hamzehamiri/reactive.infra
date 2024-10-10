import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class IconDownloadRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setCore_all_element_id(core_all_element_id) {
        this.core_all_element_id = core_all_element_id;
    }

    setRecord_id(record_id) {
        this.record_id = record_id;
    }
}