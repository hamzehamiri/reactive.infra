import {BaseModel} from "../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreAnalyticReportFieldAggregateModelDTO extends BaseModel {
    constructor() {
        super();
    }

    setUUID(uuid) {
        this.uuid = uuid;
    }

    getUUID() {
        return this.uuid;
    }
}