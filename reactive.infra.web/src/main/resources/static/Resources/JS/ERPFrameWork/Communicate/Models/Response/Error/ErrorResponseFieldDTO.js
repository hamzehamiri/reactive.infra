import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class ErrorResponseFieldDTO extends BaseModel {
    constructor() {
        super();
    }

    getCode() {
        return this.code;
    }

    getDescription() {
        return this.description;
    }
}