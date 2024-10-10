export default class WebAttachmentCentralProxy {
    static Init() {
        WebAttachmentCentralProxy.uuidEditorAttachmentDTOMap = new Map();
    }

    static Register(uuid, editorAttachmentDTO) {
        WebAttachmentCentralProxy.uuidEditorAttachmentDTOMap.set(uuid, editorAttachmentDTO);
    }

    static UnRegister(uuid) {
        WebAttachmentCentralProxy.uuidEditorAttachmentDTOMap.delete(uuid);
    }

    static CheckAttachmentIsUploading(uuid) {
        return WebAttachmentCentralProxy.uuidEditorAttachmentDTOMap.has(uuid);
    }
}