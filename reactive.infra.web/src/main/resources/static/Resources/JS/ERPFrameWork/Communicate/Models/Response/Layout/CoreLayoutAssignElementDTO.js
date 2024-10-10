import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreLayoutDTO from "./CoreLayoutDTO.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";

export default class CoreLayoutAssignElementDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreLayoutDTO() {
        if (this.coreLayoutDTO && !(this.coreLayoutDTO.constructor instanceof BaseModel)) {
            this.coreLayoutDTO = ConvertUtil.ConvertGeneral(CoreLayoutDTO, this.coreLayoutDTO);
        }
        return this.coreLayoutDTO;
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

    getJsonLayout() {
        return window.JSON.parse(this.jsonLayout);
    }
}