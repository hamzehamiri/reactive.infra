import BaseEvent from "../../../Shared/Event/BaseEvent.js";

export default class ChangePositionEvent extends BaseEvent {
    constructor(source, x, y) {
        super(source);
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return {
            x: this.x, y: this.y
        };
    }
}