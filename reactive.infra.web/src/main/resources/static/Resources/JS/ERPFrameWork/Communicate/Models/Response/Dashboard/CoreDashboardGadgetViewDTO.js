import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreDashboardGadgetDTO from "./CoreDashboardGadgetDTO.js";

export default class CoreDashboardGadgetViewDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreDashboardGadgetDTO() {
        if (this.coreDashboardGadgetDTO) {
            let coreDashboardGadgetDTO = new CoreDashboardGadgetDTO();
            coreDashboardGadgetDTO.applyData(this.coreDashboardGadgetDTO);
            return coreDashboardGadgetDTO;
        }
    }

    getLayoutDataJson() {
        return this.layoutDataJson;
    }
}