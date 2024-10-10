import Point from "./Point.js";

export default class PointerEvent {

    constructor() {
    }

    applyData(json) {
        Object.assign(this, json);
    }

    getPoint() {
        let pointNew = new Point();
        pointNew.applyData(this.point);
        return pointNew;
    }
}