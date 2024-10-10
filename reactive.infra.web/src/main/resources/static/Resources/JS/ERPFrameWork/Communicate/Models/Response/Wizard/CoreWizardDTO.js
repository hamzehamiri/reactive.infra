import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreWizardStateDTO from "./CoreWizardStateDTO.js";

export default class CoreWizardDTO extends BaseModel {
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

    getCoreWizardStateDTOMap() {
        if (this.coreWizardStateDTOMap && !(this.coreWizardStateDTOMap instanceof Map)) {
            this.coreWizardStateDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWizardStateDTO, this.coreWizardStateDTOMap);
        }
        return this.coreWizardStateDTOMap;
    }
}