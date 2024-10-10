import SVGComponent from "../SVGComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";

export default class PathSVGComponent extends SVGComponent {
    constructor(nameSpace) {
        super(nameSpace);
        this.setElement(DOM.createElementNS(nameSpace, 'path'));
    }

    initialVariables() {
        super.initialVariables();
        this.setData(PathSVGComponentElements.Elements, []);
    }

    getElements() {
        return this.getData().get(PathSVGComponentElements.Elements);
    }

    setPosition(x, y, isRtl) {
        this.x = x;
        this.y = y;
    }

    addElement(elementString) {
        this.getElements().push(elementString);
    }

    setPositionDxDy(dx, dy) {
        super.setPositionDxDy(dx, dy);
        let x = this.x + dx;
        let y = this.y + dy;
        this.setPosition(x, y);
        DOM.setAttribute(this.getElement(), 'transform', `translate(${x},${y})`);
    }

    onLoad() {
        super.onLoad();
        this.commandD = '';
        for (let i = 0; i < this.getElements().length; i++) {
            let elementString = this.getElements()[i];
            this.commandD += elementString + ' ';
        }
        DOM.setAttribute(this.getElement(), 'd', this.commandD);
    }

    static moveTo(isRelative, x, y) {
        return (!isRelative ? 'M' : 'm') + ' ' + x + ' ' + y;
    }

    static lineTo(isRelative, x, y) {
        return (!isRelative ? 'L' : 'l') + ' ' + x + ' ' + y;
    }

    static horizontal(isRelative, h) {
        return (!isRelative ? 'H' : 'h') + ' ' + h;
    }

    static vertical(isRelative, v) {
        return (!isRelative ? 'V' : 'v') + ' ' + v;
    }

    static closePath(isRelative) {
        return (!isRelative ? 'Z' : 'z');
    }

    static curve(isRelative, x1, y1, x2, y2, x, y) {
        return (isRelative ? 'C' : 'c') + `${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`;
    }
}

export const PathSVGComponentElements = {
    Elements: 'Elements'
}