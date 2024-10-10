import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";
import CoreViewModuleDTO from "./CoreViewModuleDTO.js";

export default class CoreViewModuleAssignElementDTO extends BaseModel {
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

    getCoreViewModuleDTO() {
        if (this.coreViewModuleDTO && !(this.coreViewModuleDTO.constructor instanceof BaseModel)) {
            this.coreViewModuleDTO = ConvertUtil.ConvertGeneral(CoreViewModuleDTO, this.coreViewModuleDTO);
        }
        return this.coreViewModuleDTO;
    }
}