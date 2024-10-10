import CoreFilterAssignElementMasterDTO from "../CoreFilterAssignElementMasterDTO.js";
import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreWindowTabDTO from "../../Window/Tab/CoreWindowTabDTO.js";

export default class CoreFilterAssignElementMasterFieldDTO extends CoreFilterAssignElementMasterDTO {
    constructor() {
        super();
    }

    getCoreWindowTabDTO() {
        if (this.coreWindowTabDTO && !(this.coreWindowTabDTO instanceof BaseModel)) {
            this.coreWindowTabDTO = ConvertUtil.ConvertGeneral(CoreWindowTabDTO, this.coreWindowTabDTO);
        }
        return this.coreWindowTabDTO;
    }
}