import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import RecordModelDTO from "../../Response/Window/Tab/RecordModelDTO.js";
import PagingDTO from "./PagingDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class PageDataDTO extends BaseModel {
    constructor() {
        super();
    }

    getPagingDTO() {
        if (this.pagingDTO && !(this.pagingDTO.constructor.prototype instanceof BaseModel)) {
            this.pagingDTO = ConvertUtil.ConvertGeneral(PagingDTO, this.pagingDTO);
        }
        return this.pagingDTO;
    }

    setRecordModelDTO(recordModelDTO) {
        this.recordModelDTO = recordModelDTO;
    }

    getRecordModelDTO() {
        if (this.recordModelDTO && !(this.recordModelDTO.constructor.prototype instanceof BaseModel)) {
            this.recordModelDTO = ConvertUtil.ConvertGeneral(RecordModelDTO, this.recordModelDTO);
        }
        return this.recordModelDTO;
    }
}