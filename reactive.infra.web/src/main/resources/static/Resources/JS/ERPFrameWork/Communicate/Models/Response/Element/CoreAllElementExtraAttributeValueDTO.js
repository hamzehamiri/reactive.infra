import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreAllElementExtraAttributeValueDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreAllElementExtraAttributeId() {
        return this.coreAllElementExtraAttributeId;
    }

    getRecordId() {
        return this.recordId;
    }

    getValues() {
        return this.values;
    }
}