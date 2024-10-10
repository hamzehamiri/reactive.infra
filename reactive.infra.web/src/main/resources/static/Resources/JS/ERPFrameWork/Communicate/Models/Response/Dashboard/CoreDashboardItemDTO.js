import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreDashboardDTO from "./CoreDashboardDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class CoreDashboardItemDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreDashboardDTO() {
        if (this.coreDashboardDTO && !(this.coreDashboardDTO.prototype.constructor instanceof BaseModel)) {
            this.coreDashboardDTO = ConvertUtil.ConvertGeneral(CoreDashboardDTO, this.coreDashboardDTO);
        }
        return this.coreDashboardDTO;
    }

    getParentId() {
        return this.parentId;
    }
}