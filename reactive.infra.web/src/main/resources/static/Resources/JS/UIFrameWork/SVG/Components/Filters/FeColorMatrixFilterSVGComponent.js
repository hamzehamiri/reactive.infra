import FilterSVGComponent from "./FilterSVGComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";

export default class FeColorMatrixFilterSVGComponent extends FilterSVGComponent {
    constructor(nameSpace) {
        super(nameSpace);
        this.setElement(DOM.createElementNS(nameSpace, 'feColorMatrix'));
    }

    setFilterType(filterType) {
        this.filterType = filterType;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'type', this.filterType);
        }
    }

    setValues(values) {
        this.values = values;
        if (this.getAttached()) {
            DOM.setAttribute(this.getElement(), 'values', this.values);
        }
    }
}

export const FilterType = {
    matrix: 'matrix',
    saturate: 'saturate',
    hueRotate: 'hueRotate',
    luminanceToAlpha: 'luminanceToAlpha'
}