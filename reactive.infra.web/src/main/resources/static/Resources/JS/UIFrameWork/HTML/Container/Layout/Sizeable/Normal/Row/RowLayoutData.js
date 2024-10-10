import {ShareLayoutData} from "../../../../../../Shared/Layout/ShareLayoutData.js";

export class RowLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setBorderCheck(borderCheck) {
        this.borderCheck = borderCheck;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getBorderCheck() {
        return this.borderCheck;
    }
}

RowLayoutData.factory = function (width, height, leftMargin, rightMargin, topMargin, bottomMargin, borderCheck, simpleRender) {
    let ld = new RowLayoutData();
    ld.setWidth(width);
    ld.setHeight(height);
    ld.setBorderCheck(borderCheck);

    ld.setLeft_Margin(leftMargin);
    ld.setRight_Margin(rightMargin);
    ld.setTop_Margin(topMargin);
    ld.setBottom_Margin(bottomMargin);
    ld.setSimpleRender(simpleRender);
    return ld;
};