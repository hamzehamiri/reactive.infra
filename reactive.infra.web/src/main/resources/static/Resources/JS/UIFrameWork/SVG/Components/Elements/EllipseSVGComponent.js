import SVGComponent from "../SVGComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";

export default class EllipseSVGComponent extends SVGComponent {
    constructor(nameSpace) {
        super(nameSpace);
        //<ellipse cx="1010" cy="707" rx="40" ry="40" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"></ellipse>
        this.setElement(DOM.createElementNS(nameSpace, 'ellipse'));
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

    setRx(rx) {
        this.rx = rx;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'rx', this.rx);
        }
    }

    setRy(ry) {
        this.ry = ry;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'ry', this.ry);
        }
    }

    getCx() {
        return this.cx;
    }

    getCy() {
        return this.cy;
    }

    onLoad() {
        super.onLoad();

        this.setCx(this.cx);
        this.setCy(this.cy);
        this.setRx(this.rx);
        this.setRy(this.ry);


        DOM.addStyleAttribute(this.getElement(), 'filter', 'drop-shadow(3px 3px 2px rgba(0, 0, 0, .7))');
    }
}