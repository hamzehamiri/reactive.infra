import SVGComponent from "../SVGComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";

export default class RectSVGComponent extends SVGComponent {
    constructor(nameSpace) {
        super(nameSpace);
        // <rect x="120" width="100" height="100" rx="15" ry="15" pathLength="12"/>
        this.setElement(DOM.createElementNS(nameSpace, 'rect'));
    }

    setX(x) {
        this.x = x;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'x', this.x);
        }
    }

    setY(y) {
        this.y = y;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'y', this.y);
        }
    }

    setWidth(width) {
        this.width = width;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'width', this.width);
        }
    }

    setHeight(height) {
        this.height = height;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'height', this.height);
        }
    }

    setRx(rx) {
        this.rx = rx;
        if (this.getAttached() && this.rx) {
            DOM.setAttribute(this.getElement(), 'rx', this.rx);
        }
    }

    setRy(ry) {
        this.ry = ry;
        if (this.getAttached() && this.ry) {
            DOM.setAttribute(this.getElement(), 'ry', this.ry);
        }
    }

    setPathLength(pathLength) {
        this.pathLength = pathLength;
        if (this.getAttached() && this.pathLength) {
            DOM.setAttribute(this.getElement(), 'pathLength', this.pathLength);
        }
    }

    setPositionDxDy(dx, dy) {
        super.setPositionDxDy(dx, dy);
        let x = this.x + dx;
        let y = this.y + dy;
        this.setX(x);
        this.setY(y);
    }

    onLoad() {
        super.onLoad();
        this.setX(this.x);
        this.setY(this.y);
        this.setWidth(this.width);
        this.setHeight(this.height);
        this.setRx(this.rx);
        this.setRy(this.ry);
        this.setPathLength(this.pathLength);
    }
}