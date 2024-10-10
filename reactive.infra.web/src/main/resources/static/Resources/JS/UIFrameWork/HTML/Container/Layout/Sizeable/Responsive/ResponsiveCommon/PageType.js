import {BaseModel} from "../../../../../../Shared/Common/BaseModel.js";

export default class PageType extends BaseModel {
    constructor(fromWidth, toWidth, isMobile) {
        super();
        this.fromWidth = fromWidth;
        this.toWidth = toWidth;
        this.isMobile = isMobile;
    }


    getFromWidth() {
        return this.fromWidth;
    }

    getToWidth() {
        return this.toWidth;
    }

    getHashCode() {
        return this.fromWidth + "_" + this.toWidth + "_" + this.isMobile;
    }
}