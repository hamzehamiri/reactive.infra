import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWizardValidationMessageDTO extends BaseModel {
    constructor() {
        super();
    }

    getMessage() {
        return this.message;
    }
}