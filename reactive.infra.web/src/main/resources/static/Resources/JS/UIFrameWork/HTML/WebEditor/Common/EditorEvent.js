import BaseEvent from "../../../Shared/Event/BaseEvent.js";
import {WebEditor} from "./WebEditor.js";

export default class EditorEvent extends BaseEvent {
    constructor(editor) {
        super(editor);
    }

    setValue(valueButton) {
        this.valueButton = valueButton;
    }

    getValue() {
        if (this.getSource() instanceof WebEditor && !this.valueButton) {
            return this.getSource().getValue();
        } else {
            return this.valueButton;
        }
    }

    getEditor() {
        return this.getSource();
    }

    setExtraAttribute(key, value) {
        if (!this.extraAttribute) {
            this.extraAttribute = new Map();
        }
        this.extraAttribute.set(key, value);
    }

    getExtraAttribute() {
        return this.extraAttribute;
    }
}