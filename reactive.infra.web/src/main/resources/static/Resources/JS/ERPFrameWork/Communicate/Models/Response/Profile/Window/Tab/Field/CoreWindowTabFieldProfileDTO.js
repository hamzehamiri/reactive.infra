import {BaseModel} from "../../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWindowTabFieldProfileDTO extends BaseModel {
    constructor() {
        super();
    }

    setFieldId(fieldId) {
        this.fieldId = fieldId;
    }

    getFieldId() {
        return this.fieldId;
    }

    setColumnIndex(columnIndex) {
        this.columnIndex = columnIndex;
    }

    getColumnIndex() {
        return this.columnIndex;
    }

    setColumnWidth(columnWidth) {
        this.columnWidth = columnWidth;
    }

    getColumnWidth() {
        return this.columnWidth;
    }
}