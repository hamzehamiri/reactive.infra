import {DOM} from "../../../Shared/Common/DOM.js";
import SVGComponent from "../SVGComponent.js";

export default class CircleSVGComponent extends SVGComponent {
    constructor(nameSpace) {
        super(nameSpace);
        //<ellipse cx="1010" cy="707" rx="40" ry="40" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></ellipse>
        this.setElement(DOM.createElementNS(nameSpace, 'circle'));
    }

    setCx(cx) {
        this.cx = cx;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'cx', this.cx);
        }
    }

    setCy(cy) {
        this.cy = cy;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'cy', this.cy);
        }
    }

    getCx() {
        return this.cx;
    }

    getCy() {
        return this.cy;
    }

    setPosition(x, y, isRtl) {
        this.setCx(x);
        this.setCy(y);
    }

    setPositionDxDy(dx, dy) {
        super.setPositionDxDy(dx, dy);
        this.setPosition(this.getCx() + dx, this.getCy() + dy);
    }

    setRadius(r) {
        this.r = r;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'r', this.r);
        }
    }

    onLoad() {
        super.onLoad();

        this.setCx(this.cx);
        this.setCy(this.cy);
        this.setRadius(this.r);
        DOM.addStyleAttribute(this.getElement(), 'filter', 'drop-shadow(3px 3px 2px rgba(0, 0, 0, .7))');
    }
}