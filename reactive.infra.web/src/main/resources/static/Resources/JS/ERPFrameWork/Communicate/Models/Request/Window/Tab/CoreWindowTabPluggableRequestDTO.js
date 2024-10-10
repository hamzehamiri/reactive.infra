import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWindowTabPluggableRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreWindowTabId(coreWindowTabId) {
        this.coreWindowTabId = coreWindowTabId;
    }
}