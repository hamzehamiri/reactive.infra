import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreAllElementRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setRegisterKeyArray(registerKeyArray) {
        this.registerKeyArray = registerKeyArray;
    }
}