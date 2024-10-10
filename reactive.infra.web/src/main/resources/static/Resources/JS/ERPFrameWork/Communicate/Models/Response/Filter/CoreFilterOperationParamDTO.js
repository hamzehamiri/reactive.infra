import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreTableColumnEditorDTO from "../Table/Column/CoreTableColumnEditorDTO.js";

export default class CoreFilterOperationParamDTO extends BaseModel {
    constructor() {
        super();
    }

    getReferOriginalEditor() {
        return this.referOriginalEditor;
    }

    getCoreTableColumnEditorDTO() {
        if (this.coreTableColumnEditorDTO && !(this.coreTableColumnEditorDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTableColumnEditorDTO = ConvertUtil.ConvertGeneral(CoreTableColumnEditorDTO, this.coreTableColumnEditorDTO);
        }
        return this.coreTableColumnEditorDTO;
    }
}