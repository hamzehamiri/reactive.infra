import EditorEvent from "./EditorEvent.js";

export default class ButtonEditorEvent extends EditorEvent {
    constructor(editor, key) {
        super(editor);
        this.key = key;
    }

    getKey() {
        return this.key;
    }
}