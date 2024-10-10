import Point from "./Point.js";
import {BaseModel} from "../../../Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../ERPFrameWork/Communicate/Common/ConvertUtil.js";

export default class MeshPoint extends BaseModel {
    constructor() {
        super();
        this.pointArray = [];
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }

    addPoint(point) {
        if (point instanceof Point) {
            this.pointArray.push(point);
        }
    }

    getPointArray() {
        if (this.pointArray && (this.pointArray instanceof Array && !(this.pointArray[0] instanceof BaseModel))) {
            this.pointArray = ConvertUtil.ConvertGeneralWithArray(Point, this.pointArray);
        }
        return this.pointArray;
    }
}