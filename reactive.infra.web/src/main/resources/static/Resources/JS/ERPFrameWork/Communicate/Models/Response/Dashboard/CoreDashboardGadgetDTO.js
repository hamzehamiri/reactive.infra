import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class CoreDashboardGadgetDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreAllElementDTO() {
        if (this.coreAllElementDTO && !(this.coreAllElementDTO.constructor instanceof BaseModel)) {
            this.coreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTO);
        }
        return this.coreAllElementDTO;
    }

    getRecordId() {
        return this.recordId;
    }
}