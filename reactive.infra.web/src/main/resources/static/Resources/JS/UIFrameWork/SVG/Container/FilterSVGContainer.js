import SVGContainer from "./SVGContainer.js";
import {DOM} from "../../Shared/Common/DOM.js";

export default class FilterSVGContainer extends SVGContainer {
    constructor(nameSpace) {
        super(nameSpace);
        this.setElement(DOM.createElementNS(nameSpace, 'filter'));
    }
}