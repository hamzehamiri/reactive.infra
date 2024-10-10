import {ShareLayoutData} from "../../../../../../UIFrameWork/Shared/Layout/ShareLayoutData.js";

export default class GraphTabSVGLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}

GraphTabSVGLayoutData.factory = function (x, y, width, height) {
    let ld = new GraphTabSVGLayoutData();
    ld.setX(x);
    ld.setY(y);
    ld.setWidth(width);
    ld.setHeight(height);
    return ld;
};