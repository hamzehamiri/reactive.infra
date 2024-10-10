import BaseEvent from "../../../../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class WebAttachmentUIStartUploadEvent extends BaseEvent {
    constructor(attachmentUI, formData, editorAttachmentDTO) {
        super(attachmentUI);
        this.formData = formData;
        this.editorAttachmentDTO = editorAttachmentDTO;
    }

    getFormData() {
        return this.formData;
    }

    getEditorAttachmentDTO() {
        return this.editorAttachmentDTO;
    }
}