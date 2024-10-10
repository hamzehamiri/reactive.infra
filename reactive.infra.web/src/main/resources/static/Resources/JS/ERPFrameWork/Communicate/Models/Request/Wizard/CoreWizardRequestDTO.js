import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../../Response/Element/CoreAllElementDTO.js";

export default class CoreWizardRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreAllElementDTO(coreAllElementDTO) {
        this.coreAllElementDTO = coreAllElementDTO;
    }

    getCoreAllElementDTO() {
        if (this.coreAllElementDTO && !(this.coreAllElementDTO.constructor instanceof BaseModel)) {
            this.coreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTO);
        }
        return this.coreAllElementDTO;
    }

    setRecordId(recordId) {
        this.recordId = recordId;
    }

    getRecordId() {
        return this.recordId;
    }

    setRegisterKey(registerKey) {
        this.registerKey = registerKey;
    }

    getRegisterKey() {
        return this.registerKey;
    }
}