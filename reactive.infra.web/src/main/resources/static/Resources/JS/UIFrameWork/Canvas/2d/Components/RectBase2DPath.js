import BaseCanvas2DPath from "./BaseCanvas2DPath.js";
import AlgorithmsUtil from "../../../Shared/Common/AlgorithmsUtil.js";

export default class RectBase2DPath extends BaseCanvas2DPath {
    constructor() {
        super();
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getBoundaryRect() {
        return AlgorithmsUtil.RectBoundaryWithRect(0, 0, this.width, this.height);
    }

    draw() {
        this.path2d = new Path2D();
        this.path2d.rect(this.x, this.y, this.width, this.height);
    }
}