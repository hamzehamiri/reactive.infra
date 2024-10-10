import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreLayoutDataDTO extends BaseModel {
    constructor() {
        super();
    }

    setRegisterKey(registerKey) {
        this.registerKey = registerKey;
    }

    getRegisterKey() {
        return this.registerKey;
    }
}