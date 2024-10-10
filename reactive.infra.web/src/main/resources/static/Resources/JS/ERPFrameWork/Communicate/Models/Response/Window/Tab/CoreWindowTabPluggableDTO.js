import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreViewModuleDTO from "../../View/CoreViewModuleDTO.js";

export default class CoreWindowTabPluggableDTO extends BaseModel {
    constructor() {
        super();
    }

    getRegisterKey() {
        return this.registerKey;
    }

    getCoreViewModuleDTO() {
        if (this.coreViewModuleDTO && !(this.coreViewModuleDTO.constructor.prototype instanceof BaseModel)) {
            this.coreViewModuleDTO = ConvertUtil.ConvertGeneral(CoreViewModuleDTO, this.coreViewModuleDTO);
        }
        return this.coreViewModuleDTO;
    }
}