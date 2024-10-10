import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class EditorAttachmentDTO extends BaseModel {
    constructor() {
        super();
    }

    setFileName(fileName) {
        this.fileName = fileName;
    }

    setCoreAllElementDTO(coreAllElementDTO) {
        this.coreAllElementDTO = coreAllElementDTO;
    }

    setRecordId(recordId) {
        this.recordId = recordId;
    }

    setFile(file) {
        this.file = file;
    }

    setUploadPercent(uploadPercent) {
        this.uploadPercent = uploadPercent;
    }

    getFile() {
        return this.file;
    }

    getFileName() {
        return this.fileName;
    }

    getUploadPercent() {
        return this.uploadPercent;
    }
}