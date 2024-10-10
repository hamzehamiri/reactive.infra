import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWindowTabTypeDTO extends BaseModel {
    constructor() {
        super();
    }

    getRegisterKey() {
        return this.registerKey;
    }
}