import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreUserDTO from "./CoreUserDTO.js";
import CoreTenantDTO from "../Tenant/CoreTenantDTO.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";

export default class CoreUserTenantDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreUserDTO(coreUserDTO) {
        this.coreUserDTO = coreUserDTO;
    }

    setCoreTenantDTO(coreTenantDTO) {
        this.coreTenantDTO = coreTenantDTO;
    }

    setIsActive(isActive) {
        this.isActive = isActive;
    }

    getCoreUserDTO() {
        if (this.coreUserDTO && !(this.coreUserDTO.constructor.prototype instanceof BaseModel)) {
            this.coreUserDTO = ConvertUtil.ConvertGeneral(CoreUserDTO, this.coreUserDTO);
        }
        return this.coreUserDTO;
    }

    getCoreTenantDTO() {
        if (this.coreTenantDTO && !(this.coreTenantDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTenantDTO = ConvertUtil.ConvertGeneral(CoreTenantDTO, this.coreTenantDTO);
        }
        return this.coreTenantDTO;
    }
}