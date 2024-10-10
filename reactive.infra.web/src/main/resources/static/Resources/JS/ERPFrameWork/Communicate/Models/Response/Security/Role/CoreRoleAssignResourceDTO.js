import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../../Element/CoreAllElementDTO.js";

export default class CoreRoleAssignResourceDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreAllElementDTO(){
        if (this.coreAllElementDTO && !(this.coreAllElementDTO.constructor instanceof BaseModel)) {
            this.coreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTO);
        }
        return this.coreAllElementDTO;
    }
}