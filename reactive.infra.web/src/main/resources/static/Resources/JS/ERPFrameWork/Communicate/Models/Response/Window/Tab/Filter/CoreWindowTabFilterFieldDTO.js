import {BaseModel} from "../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../Common/ConvertUtil.js";
import CoreWindowTabFieldDTO from "../Field/CoreWindowTabFieldDTO.js";
import CoreTableColumnEditorDTO from "../../../Table/Column/CoreTableColumnEditorDTO.js";

export default class CoreWindowTabFilterFieldDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreWindowTabFilterId() {
        return this.coreWindowTabFilterId;
    }

    getCoreWindowTabFieldDTO() {
        if (this.coreWindowTabFieldDTO != null && !(this.coreWindowTabFieldDTO.constructor instanceof BaseModel)) {
            this.coreWindowTabFieldDTO = ConvertUtil.ConvertGeneral(CoreWindowTabFieldDTO, this.coreWindowTabFieldDTO);
        }
        return this.coreWindowTabFieldDTO;
    }

    getCoreTableColumnEditorDTO() {
        if (this.coreTableColumnEditorDTO != null && !(this.coreTableColumnEditorDTO.constructor instanceof BaseModel)) {
            this.coreTableColumnEditorDTO = ConvertUtil.ConvertGeneral(CoreTableColumnEditorDTO, this.coreTableColumnEditorDTO);
        }
        return this.coreTableColumnEditorDTO;
    }
}