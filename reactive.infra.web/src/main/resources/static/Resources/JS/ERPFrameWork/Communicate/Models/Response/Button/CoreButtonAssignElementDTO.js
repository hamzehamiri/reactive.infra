import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";
import CoreButtonDTO from "./CoreButtonDTO.js";
import CoreCssDTO from "../Css/CoreCssDTO.js";
import CoreLayoutDataAssignElementDTO from "../Layout/CoreLayoutDataAssignElementDTO.js";
import CoreAllElementExtraAttributeValueDTO from "../Element/CoreAllElementExtraAttributeValueDTO.js";

export default class CoreButtonAssignElementDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreButtonDTO() {
        if (this.coreButtonDTO && !(this.coreButtonDTO.constructor.prototype instanceof BaseModel)) {
            this.coreButtonDTO = ConvertUtil.ConvertGeneral(CoreButtonDTO, this.coreButtonDTO);
        }
        return this.coreButtonDTO;
    }

    getCoreCssDTO() {
        if (this.coreCssDTO && !(this.coreCssDTO.constructor.prototype instanceof BaseModel)) {
            this.coreCssDTO = ConvertUtil.ConvertGeneral(CoreCssDTO, this.coreCssDTO);
        }
        return this.coreCssDTO;
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

    getButtonIndex() {
        return this.buttonIndex;
    }

    setCoreLayoutDataAssignElementDTOMap(coreLayoutDataAssignElementDTOMap) {
        this.coreLayoutDataAssignElementDTOMap = coreLayoutDataAssignElementDTOMap;
    }

    getCoreLayoutDataAssignElementDTOMap() {
        if (this.coreLayoutDataAssignElementDTOMap && !(this.coreLayoutDataAssignElementDTOMap instanceof Map)) {
            this.coreLayoutDataAssignElementDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreLayoutDataAssignElementDTO, this.coreLayoutDataAssignElementDTOMap);
        }
        return this.coreLayoutDataAssignElementDTOMap;
    }

    getCoreAllElementExtraAttributeValueDTOMap() {
        if (this.coreAllElementExtraAttributeValueDTOMap && !(this.coreAllElementExtraAttributeValueDTOMap instanceof Map)) {
            this.coreAllElementExtraAttributeValueDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreAllElementExtraAttributeValueDTO, this.coreAllElementExtraAttributeValueDTOMap);
        }
    }

    getCoreAllElementDTOModule() {
        if (this.coreAllElementDTOModule && !(this.coreAllElementDTOModule.constructor instanceof BaseModel)) {
            this.coreAllElementDTOModule = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTOModule);
        }
        return this.coreAllElementDTOModule;
    }

    getRecordIdModule() {
        return this.recordIdModule;
    }
}