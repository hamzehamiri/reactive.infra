import {ShareLayoutData} from "../../../../../../Shared/Layout/ShareLayoutData.js";

export class AnchorLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setMiddleHorizontal(middleHorizontal) {
        this.middleHorizontal = middleHorizontal;
    }

    getMiddleHorizontal() {
        return this.middleHorizontal;
    }

    setMiddleVertical(middleVertical) {
        this.middleVertical = middleVertical;
    }

    getMiddleVertical() {
        return this.middleVertical;
    }

    setPrimitiveRect(primitiveRect) {
        this.primitiveRect = primitiveRect;
    }

    getPrimitiveRect() {
        return this.primitiveRect;
    }

    setTop(anchorData_Top) {
        this.anchorData_Top = anchorData_Top;
    }

    getTop() {
        return this.anchorData_Top;
    }

    setBottom(anchorData_Bottom) {
        this.anchorData_Bottom = anchorData_Bottom;
    }

    getBottom() {
        return this.anchorData_Bottom;
    }

    setLeft(anchorData_Left) {
        this.anchorData_Left = anchorData_Left;
    }

    getLeft() {
        return this.anchorData_Left;
    }

    setRight(anchorData_Right) {
        this.anchorData_Right = anchorData_Right;
    }

    getRight() {
        return this.anchorData_Right;
    }
}

AnchorLayoutData.factory = function (top, bottom, left, right, primitiveRect, middleHorizontal, middleVertical) {
    let ld = new AnchorLayoutData();
    ld.setTop(top);
    ld.setBottom(bottom);
    ld.setLeft(left);
    ld.setRight(right);
    ld.setPrimitiveRect(primitiveRect);
    ld.setMiddleHorizontal(middleHorizontal);
    ld.setMiddleVertical(middleVertical);
    return ld;
};