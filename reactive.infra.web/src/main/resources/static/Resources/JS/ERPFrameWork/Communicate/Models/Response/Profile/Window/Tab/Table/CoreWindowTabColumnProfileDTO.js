import {BaseModel} from "../../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../../Common/ConvertUtil.js";
import CoreWindowTabFieldSortOrderProfileDTO from "../Field/CoreWindowTabFieldSortOrderProfileDTO.js";

export default class CoreWindowTabColumnProfileDTO extends BaseModel {

    setFieldId(fieldId) {
        this.fieldId = fieldId;
    }

    getFieldId() {
        return this.fieldId;
    }

    setWidthColumn(widthColumn) {
        this.widthColumn = widthColumn;
    }

    getWidthColumn() {
        return this.widthColumn;
    }

    setIndexColumn(indexColumn) {
        this.indexColumn = indexColumn;
    }

    getIndexColumn() {
        return this.indexColumn;
    }

    setSortOrder(sortOrder) {
        this.sortOrder = sortOrder;
    }

    getSortOrder() {
        if (this.sortOrder) {
            if (!(this.sortOrder.constructor.prototype instanceof BaseModel)) {
                this.sortOrder = ConvertUtil.ConvertGeneral(CoreWindowTabFieldSortOrderProfileDTO, this.sortOrder);
            }
        } else {
            this.sortOrder = new CoreWindowTabFieldSortOrderProfileDTO();
        }
        return this.sortOrder;
    }
}