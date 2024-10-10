import WebEditorModelKeyDisplay from "./WebEditorModelKeyDisplay.js";

export default class WebEditorModelKeyDisplayArray {
    constructor() {
        this.mapValue = new Map();
    }

    addValue(value) {
        if (value instanceof WebEditorModelKeyDisplay) {
            this.mapValue.set(value.getKey(), value);
        }
    }

    getMapValues() {
        return this.mapValue;
    }

    getArrayValues() {
        return [...this.mapValue.values()];
    }
}