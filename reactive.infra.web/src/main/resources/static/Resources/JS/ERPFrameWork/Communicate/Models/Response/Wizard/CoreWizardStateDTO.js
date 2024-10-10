import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../Element/CoreAllElementDTO.js";
import CoreWizardStateValueDTO from "./CoreWizardStateValueDTO.js";
import CoreWizardValidationDTO from "./CoreWizardValidationDTO.js";

export default class CoreWizardStateDTO extends BaseModel {
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

    getCoreWizardId() {
        return this.coreWizardId;
    }

    getIndex() {
        return this.index;
    }

    getCoreWizardStateValueDTOMap() {
        if (this.coreWizardStateValueDTOMap && !(this.coreWizardStateValueDTOMap instanceof Map)) {
            this.coreWizardStateValueDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWizardStateValueDTO, this.coreWizardStateValueDTOMap);
        }
        return this.coreWizardStateValueDTOMap;
    }

    getCoreWizardValidationDTOMap() {
        if (this.coreWizardValidationDTOMap && !(this.coreWizardValidationDTOMap instanceof Map)) {
            this.coreWizardValidationDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWizardValidationDTO, this.coreWizardValidationDTOMap);
        }
        return this.coreWizardValidationDTOMap;
    }
}