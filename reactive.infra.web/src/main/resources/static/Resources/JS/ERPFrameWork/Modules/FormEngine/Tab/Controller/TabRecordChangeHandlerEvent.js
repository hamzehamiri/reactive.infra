import BaseEvent from "../../../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class TabRecordChangeHandlerEvent extends BaseEvent {
    constructor(webEditor, targetRecord, editorCoreWindowTabField, editorValueChangedModel) {
        super(webEditor);
        this.targetRecord = targetRecord;
        this.editorCoreWindowTabField = editorCoreWindowTabField;
        this.editorValueChangedModel = editorValueChangedModel;
    }

    getTargetRecord() {
        return this.targetRecord;
    }

    getEditorCoreWindowTabField() {
        return this.editorCoreWindowTabField;
    }

    getEditorValueChangedModel() {
        return this.editorValueChangedModel;
    }
}