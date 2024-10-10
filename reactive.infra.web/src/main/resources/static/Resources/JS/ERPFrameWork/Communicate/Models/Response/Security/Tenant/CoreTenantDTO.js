import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreTenantTypeDTO from "./CoreTenantTypeDTO.js";

export default class CoreTenantDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreTenantTypeId(coreTenantTypeId) {
        this.coreTenantTypeId = coreTenantTypeId;
    }

    getCoreTenantTypeId() {
        return this.coreTenantTypeId ? new CoreTenantTypeDTO().applyData(this.coreTenantTypeId) : null;
    }
}