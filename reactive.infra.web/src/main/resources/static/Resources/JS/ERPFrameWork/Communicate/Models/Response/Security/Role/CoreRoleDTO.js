import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreRoleDTO extends BaseModel {
    constructor() {
        super();
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}