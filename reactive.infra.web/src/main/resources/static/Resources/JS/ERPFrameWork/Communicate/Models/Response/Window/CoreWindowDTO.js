import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreWindowTabDTO from "./Tab/CoreWindowTabDTO.js";
import CoreWindowProfileDTO from "../Profile/Window/CoreWindowProfileDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreViewModuleDTO from "../View/CoreViewModuleDTO.js";

export class CoreWindowDTO extends BaseModel {

    constructor() {
        super();
    }

    setCoreWindowTabDTOMap(coreWindowTabDTOMap) {
        this.coreWindowTabDTOMap = coreWindowTabDTOMap;
    }

    getCoreWindowTabDTOMap() {
        if (this.coreWindowTabDTOMap && !(this.coreWindowTabDTOMap instanceof Map)) {
            this.coreWindowTabDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWindowTabDTO, this.coreWindowTabDTOMap);
        }
        return this.coreWindowTabDTOMap;
    }

    getCoreWindowProfileDTO() {
        if (this.coreWindowProfileDTO && !(this.coreWindowProfileDTO.constructor.prototype instanceof BaseModel)) {
            this.coreWindowProfileDTO = ConvertUtil.ConvertGeneral(CoreWindowProfileDTO, this.coreWindowProfileDTO);
        }
        return this.coreWindowProfileDTO;
    }

    getCoreViewModuleDTO() {
        if (this.coreViewModuleDTO && !(this.coreViewModuleDTO.constructor.prototype instanceof BaseModel)) {
            this.coreViewModuleDTO = ConvertUtil.ConvertGeneral(CoreViewModuleDTO, this.coreViewModuleDTO);
        }
        return this.coreViewModuleDTO;
    }
}