import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreCssDTO extends BaseModel {
    constructor() {
        super();
    }

    getJsonAttribute() {
        if (this.jsonAttributeJson)
            return this.jsonAttributeJson;
        if (this.jsonAttribute) {
            this.jsonAttributeJson = JSON.parse(this.jsonAttribute);
            return this.jsonAttributeJson;
        }
        return null;
    }
}