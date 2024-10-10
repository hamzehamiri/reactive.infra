export default class WebEditorModelKeyDisplay {

    constructor(key, display, originalModel) {
        this.key = key;
        this.display = display;
        this.originalModel = originalModel;
    }

    setKey(key) {
        this.key = key;
    }

    getKey() {
        return this.key;
    }

    setDisplay(display) {
        this.display = display;
    }

    getDisplay() {
        return this.display;
    }

    setOriginalModel(originalModel) {
        this.originalModel = originalModel;
    }

    getOriginal() {
        return this.originalModel;
    }
}