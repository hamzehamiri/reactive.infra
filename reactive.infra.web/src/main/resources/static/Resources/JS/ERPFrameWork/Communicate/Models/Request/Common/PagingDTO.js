import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class PagingDTO extends BaseModel {
    constructor() {
        super();
    }

    setTotalRecord(totalRecord) {
        this.totalRecord = totalRecord;
    }

    setFromRecord(fromRecord) {
        this.fromRecord = fromRecord;
    }

    setToRecord(toRecord) {
        this.toRecord = toRecord;
    }

    getFromRecord() {
        return this.fromRecord;
    }

    getToRecord() {
        return this.toRecord;
    }

    getTotalRecord() {
        return this.totalRecord;
    }

    getPageSize() {
        return this.toRecord - this.fromRecord;
    }

    getAllPage() {
        return Math.round(this.totalRecord / this.getPageSize());
    }

    getPageNumber() {
        return Math.round(this.fromRecord / this.getPageSize()) + 1;
    }
}