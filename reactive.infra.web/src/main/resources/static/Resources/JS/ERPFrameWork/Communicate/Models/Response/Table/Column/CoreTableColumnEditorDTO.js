import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreTableColumnEditorDTO extends BaseModel {
    constructor() {
        super();
    }

    setEditorClassRegisterKey(editorClassRegisterKey) {
        this.editorClassRegisterKey = editorClassRegisterKey;
    }

    getEditorClassRegisterKey() {
        return this.editorClassRegisterKey;
    }
}