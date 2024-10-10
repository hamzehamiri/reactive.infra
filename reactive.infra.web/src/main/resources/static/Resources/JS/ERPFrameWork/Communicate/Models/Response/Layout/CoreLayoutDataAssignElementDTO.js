import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreLayoutDataDTO from "./CoreLayoutDataDTO.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";

export default class CoreLayoutDataAssignElementDTO extends BaseModel {
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

    setCoreLayoutDataDTO(coreLayoutDataDTO) {
        this.coreLayoutDataDTO = coreLayoutDataDTO;
    }

    getCoreLayoutDataDTO() {
        if (this.coreLayoutDataDTO && !(this.coreLayoutDataDTO.constructor instanceof BaseModel)) {
            this.coreLayoutDataDTO = ConvertUtil.ConvertGeneral(CoreLayoutDataDTO, this.coreLayoutDataDTO);
        }
        return this.coreLayoutDataDTO;
    }

    getCoreLayoutDTO() {
        if (this.coreLayoutDTO && !(this.coreLayoutDTO.constructor instanceof BaseModel)) {
            this.coreLayoutDTO = ConvertUtil.ConvertGeneral(CoreLayoutDataDTO, this.coreLayoutDTO);
        }
        return this.coreLayoutDTO;
    }

    setJsonLayoutData(jsonLayoutData) {
        this.jsonLayoutData = jsonLayoutData;
    }

    getJsonLayoutData() {
        return window.JSON.parse(this.jsonLayoutData);
    }
}