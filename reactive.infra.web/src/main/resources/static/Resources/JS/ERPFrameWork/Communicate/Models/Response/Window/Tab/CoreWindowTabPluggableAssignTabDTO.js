import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreWindowTabPluggableDTO from "./CoreWindowTabPluggableDTO.js";

export default class CoreWindowTabPluggableAssignTabDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreWindowTabId() {
        return this.coreWindowTabId;
    }

    getCoreWindowTabPluggableDTO() {
        if (this.coreWindowTabPluggableDTO && !(this.coreWindowTabPluggableDTO.constructor.prototype instanceof BaseModel)) {
            this.coreWindowTabPluggableDTO = ConvertUtil.ConvertGeneral(CoreWindowTabPluggableDTO, this.coreWindowTabPluggableDTO);
        }
        return this.coreWindowTabPluggableDTO;
    }
}