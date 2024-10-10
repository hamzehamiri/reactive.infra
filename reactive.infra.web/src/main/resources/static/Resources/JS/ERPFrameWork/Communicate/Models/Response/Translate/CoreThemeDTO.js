import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreThemeDTO extends BaseModel {
    constructor() {
        super();
    }

    setJsonCss(jsonCss) {
        this.jsonCss = jsonCss;
    }

    getJsonCss() {
        if (this.jsonCss && !(this.jsonCss.constructor === JSON.constructor)) {
            this.jsonCss = JSON.parse(this.jsonCss);
        }
        return this.jsonCss;
    }
}