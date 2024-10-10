import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CommonBaseCoreAllElementDTO from "../Common/CommonBaseCoreAllElementDTO.js";

export default class CoreMenuDTO extends CommonBaseCoreAllElementDTO {
    constructor() {
        super();
    }

    setCoreAllElement(coreAllElement) {
        this.coreAllElement = coreAllElement;
    }

    setCoreMenuParentId(coreMenuParentId) {
        this.coreMenuParentId = coreMenuParentId;
    }

    setCoreMenuRecordId(coreMenuRecordId) {
        this.coreMenuRecordId = coreMenuRecordId;
    }

    getCoreAllElementDTO() {
        if (this.coreAllElementDTO && !(this.coreAllElementDTO.constructor instanceof BaseModel)) {
            this.coreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTO);
        }
        return this.coreAllElementDTO;
    }

    getCoreMenuParentId() {
        return this.coreMenuParentId;
    }

    getCoreMenuRecordId() {
        return this.coreMenuRecordId;
    }

}