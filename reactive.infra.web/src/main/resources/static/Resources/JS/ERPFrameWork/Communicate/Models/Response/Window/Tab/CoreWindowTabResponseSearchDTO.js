import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import RecordModelDTO from "./RecordModelDTO.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";

export default class CoreWindowTabResponseSearchDTO extends BaseModel {
    constructor() {
        super();
    }

    getUuidTarget() {
        return this.uuidTarget;
    }

    getCoreWindowTabId() {
        return this.coreWindowTabId;
    }

    getRecordModelDTO() {
        if (!(this.recordModelDTO.constructor.prototype instanceof BaseModel)) {
            this.recordModelDTO = ConvertUtil.ConvertGeneral(RecordModelDTO, this.recordModelDTO);
        }
        return this.recordModelDTO;
    }
}