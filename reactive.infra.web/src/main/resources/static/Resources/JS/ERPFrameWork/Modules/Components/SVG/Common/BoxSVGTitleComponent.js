import SVGComponent from "../../../../../UIFrameWork/SVG/Components/SVGComponent.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";

export class BoxSVGTitleComponent extends SVGComponent {
    constructor(nameSpace) {
        super(nameSpace);

        this.rectElement = DOM.createElementNS(nameSpace, 'rect');
        this.textElement = DOM.createElementNS(nameSpace, 'text');
        let masterElement = DOM.createElementNS(nameSpace, 'g');
        masterElement.appendChild(this.rectElement);
        masterElement.appendChild(this.textElement);

        this.setElement(masterElement);
    }

    setTitle(title) {
        this.title = title;
        if (this.getAttached()) {
            this.textElement.innerHTML = title;
        }
    }

    getTextElement() {
        return this.textElement;
    }

    setSize(width, height) {
        // super.setSize(width, height);

        this.setWidth(width);
        this.setHeight(height);
    }

    setX(x) {
        this.x = x;
        // if (this.getAttached()) {
        //     DOM.setAttribute(this.getElement(), 'x', this.x);
        // }
    }

    setY(y) {
        this.y = y;
        // if (this.getAttached()) {
        //     DOM.setAttribute(this.getElement(), 'y', this.y);
        // }
    }

    setWidth(width) {
        // super.setWidth(width);
        // DOM.setWidth(this.rectElement, width);

        // DOM.setAttribute(this.getElement(), 'width', width);
        DOM.setAttribute(this.rectElement, 'width', width);

        DOM.setAttribute(this.textElement, 'x', width / 2);
    }

    setHeight(height) {
        // super.setHeight(height);
        // DOM.setHeight(this.rectElement, height);
        // DOM.setHeight(this.textElement, height);

        // DOM.setAttribute(this.getElement(), 'height', height);
        DOM.setAttribute(this.rectElement, 'height', height);

        DOM.setAttribute(this.textElement, 'y', (height / 2) + 5);
    }

    setPosition(x, y, isRtl) {
        // super.setPosition(x, y, isRtl);

        DOM.addStyleAttribute(this.getElement(), 'transform', `translate(${x}px, ${y}px)`)
        this.setX(x);
        this.setY(y);
    }

    setPositionDxDy(dx, dy) {
        super.setPositionDxDy(dx, dy);
        this.setPosition(this.x + dx, this.y + dy);
    }

    onLoad() {
        super.onLoad();

        DOM.setAttribute(this.rectElement, 'x', '0');
        DOM.setAttribute(this.rectElement, 'y', '0');
        DOM.setAttribute(this.rectElement, 'fill', 'lightblue');

        DOM.setAttribute(this.textElement, 'text-anchor', 'middle');
        // DOM.setAttribute( this.textElement, 'dominant-baseline', 'middle');

        this.setX(this.x);
        this.setY(this.y);
        this.setTitle(this.title);

        DOM.addStyleAttribute(this.rectElement, 'filter', 'drop-shadow(3px 3px 2px rgba(0, 0, 0, .7))');
    }

}