import {ShareLayoutData} from "../../../../../../Shared/Layout/ShareLayoutData.js";
import PageType from "../ResponsiveCommon/PageType.js";
import {BaseModel} from "../../../../../../Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../../../ERPFrameWork/Communicate/Common/ConvertUtil.js";

export default class ResponsiveTableLayoutDataElement extends ShareLayoutData {
    constructor(pageType, columnIndex, rowIndex, colSpan, rowSpan) {
        super();
        if (pageType instanceof PageType) {
            this.pageType = pageType;
        }
        this.columnIndex = columnIndex;
        this.rowIndex = rowIndex;
        this.colSpan = colSpan;
        this.rowSpan = rowSpan;
    }

    setRangeWidth(fromWidth, toWidth) {
        this.fromWidth = fromWidth;
        this.toWidth = toWidth;
    }

    setColumnIndex(columnIndex) {
        this.columnIndex = columnIndex;
    }

    setColSpan(colSpan) {
        this.colSpan = colSpan;
    }

    setRowSpan(rowSpan) {
        this.rowSpan = rowSpan;
    }

    getColumnIndex() {
        return this.columnIndex;
    }


    getRowIndex() {
        return this.rowIndex;
    }

    getColSpan() {
        return this.colSpan;
    }

    getRowSpan() {
        return this.rowSpan;
    }

    getPageType() {
        if (this.pageType && !(this.pageType.constructor instanceof BaseModel)) {
            this.pageType = ConvertUtil.ConvertGeneral(PageType, this.pageType);
        }
        return this.pageType;
    }
}