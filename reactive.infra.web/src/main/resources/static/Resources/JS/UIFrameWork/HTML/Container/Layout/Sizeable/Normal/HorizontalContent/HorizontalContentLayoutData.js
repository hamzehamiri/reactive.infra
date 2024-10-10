import {ShareLayoutData} from "../../../../../../Shared/Layout/ShareLayoutData.js";

export default class HorizontalContentLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setContent(title) {
        this.title = title;
    }

    getContent() {
        return this.title;
    }

    setElementEffectiveFunction(elementEffectiveFunction) {
        this.elementEffectiveFunction = elementEffectiveFunction;
    }

    getElementEffectiveFunction() {
        return this.elementEffectiveFunction;
    }
}