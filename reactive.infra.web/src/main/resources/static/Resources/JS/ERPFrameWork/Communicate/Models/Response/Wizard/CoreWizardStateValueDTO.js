import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWizardStateValueDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreWizardStateId() {
        return this.coreWizardStateId;
    }

    getJsonValue() {
        return JSON.parse(this.jsonValue);
    }
}