import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreDashboardDTO from "./CoreDashboardDTO.js";

export default class CoreDashboardViewDTO extends BaseModel {

    constructor() {
        super();
    }

    getCoreDashboardDTO() {
        if (this.coreDashboardDTO) {
            let coreDashboardDTO = new CoreDashboardDTO();
            coreDashboardDTO.applyData(this.coreDashboardDTO);
            return coreDashboardDTO;
        }
        return null;
    }

    getParentId() {
        return this.parentId;
    }

    getLayoutJson() {
        return this.layoutJson;
    }
}