export default class MultiOptionButtonEditorOriginalModel {
    constructor(active) {
        this.active = active;
    }

    setIsActive(active) {
        this.active = active;
    }

    isActive() {
        return this.active;
    }
}