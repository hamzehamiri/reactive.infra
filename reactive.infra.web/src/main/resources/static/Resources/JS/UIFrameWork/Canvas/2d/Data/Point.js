import {BaseModel} from "../../../Shared/Common/BaseModel.js";

export default class Point extends BaseModel {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}