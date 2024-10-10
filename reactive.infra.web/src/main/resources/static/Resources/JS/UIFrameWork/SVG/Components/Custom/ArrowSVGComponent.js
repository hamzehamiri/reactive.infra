import SVGContainer from "../../Container/SVGContainer.js";

export default class ArrowSVGComponent extends SVGContainer {
    constructor(nameSpace) {
        super(nameSpace);
    }

    lineStart(startX, startY) {
        this.startX = startX;
        this.startY = startY;
    }

    lineEnd(endX, endY) {
        this.endX = endX;
        this.endY = endY;
    }

    setArrowSide(arrowSide) {
        this.arrowSide = arrowSide;
    }

    onLoad() {
        super.onLoad();

    }
}

export const ArrowSide = {
    Left: 'Left',
    Right: 'Right',
    Top: 'Top',
    Bottom: 'Bottom'
}