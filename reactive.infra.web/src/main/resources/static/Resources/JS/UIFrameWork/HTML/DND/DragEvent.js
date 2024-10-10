import BaseEvent from "../../Shared/Event/BaseEvent.js";

export default class DragEvent extends BaseEvent {
    constructor(component, dx_dy, dx, dy) {
        super(component);
        this.dx_dy = dx_dy;
        this.dx = dx;
        this.dy = dy;
    }

    setMateSizeComponent(mateSizeComponent) {
        this.mateSizeComponent = mateSizeComponent;
    }

    getDxDy() {
        return this.dx_dy;
    }

    getDx() {
        return this.dx;
    }

    getDy() {
        return this.dy;
    }

    getMateSizeComponent() {
        return this.mateSizeComponent;
    }

    setXFinal(xFinal) {
        this.xFinal = xFinal;
    }

    getXFinal() {
        return this.xFinal;
    }

    setYFinal(yFinal) {
        this.yFinal = yFinal;
    }

    getYFinal() {
        return this.yFinal;
    }
}