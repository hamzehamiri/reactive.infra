import {BaseModel} from "../Common/BaseModel.js";

export class ShareLayoutData extends BaseModel {

    constructor() {
        super();
    }

    setZIndex(zIndex) {
        this.zIndex = zIndex;
    }

    getZIndex() {
        return this.zIndex;
    }

    getData() {
        if (!this.data) {
            this.data = new Map();
        }
        return this.data;
    }

    setData(key, value) {
        this.getData().set(key, value);
    }

    setLeft_Margin(leftMargin) {
        this.leftMargin = leftMargin;
    }

    setRight_Margin(rightMargin) {
        this.rightMargin = rightMargin;
    }

    setTop_Margin(topMargin) {
        this.topMargin = topMargin;
    }

    setBottom_Margin(bottomMargin) {
        this.bottomMargin = bottomMargin;
    }

    setSimpleRender(simpleRender) {
        this.simpleRender = simpleRender;
    }

    getSimpleRender() {
        return this.simpleRender;
    }

    setMargin(margin) {
        this.setLeft_Margin(margin);
        this.setRight_Margin(margin);
        this.setTop_Margin(margin);
        this.setBottom_Margin(margin);
    }

    getLeft_Margin() {
        return this.leftMargin;
    }

    getRight_Margin() {
        return this.rightMargin;
    }

    getTop_Margin() {
        return this.topMargin;
    }

    getBottom_Margin() {
        return this.bottomMargin;
    }
}