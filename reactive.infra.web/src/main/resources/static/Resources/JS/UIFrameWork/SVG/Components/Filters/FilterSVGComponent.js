import SVGComponent from "../SVGComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";

export default class FilterSVGComponent extends SVGComponent {
    constructor(nameSpace) {
        super(nameSpace);
    }

    setIn(inFilter) {
        this.inFilter = inFilter;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'in', this.inFilter);
        }
    }
}

export const InFilter = {
    SourceGraphic: 'SourceGraphic',
    SourceAlpha: 'SourceAlpha',
    BackgroundImage: 'BackgroundImage',
    BackgroundAlpha: 'BackgroundAlpha',
    FillPaint: 'FillPaint',
    StrokePaint: 'StrokePaint'
}