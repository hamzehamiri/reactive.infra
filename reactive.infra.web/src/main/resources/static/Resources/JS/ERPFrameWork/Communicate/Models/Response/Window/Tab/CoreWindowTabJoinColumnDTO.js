import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreWindowTabTypeDTO from "./CoreWindowTabTypeDTO.js";

export default class CoreWindowTabJoinColumnDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreWindowTabMasterId() {
        return this.coreWindowTabMasterId;
    }

    getCoreWindowTabFieldMasterId() {
        return this.coreWindowTabFieldMasterId;
    }

    getCoreWindowTabChildId() {
        return this.coreWindowTabChildId;
    }

    getCoreWindowTabFieldChildId() {
        return this.coreWindowTabFieldChildId;
    }

    getCoreWindowTabTypeDTO() {
        if (this.coreWindowTabTypeDTO && !(this.coreWindowTabTypeDTO instanceof BaseModel)) {
            this.coreWindowTabTypeDTO = ConvertUtil.ConvertGeneral(CoreWindowTabTypeDTO, this.coreWindowTabTypeDTO);
        }
        return this.coreWindowTabTypeDTO;
    }
}