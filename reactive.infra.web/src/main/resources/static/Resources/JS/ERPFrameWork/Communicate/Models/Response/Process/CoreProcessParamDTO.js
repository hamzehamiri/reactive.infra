import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreTableColumnEditorDTO from "../Table/Column/CoreTableColumnEditorDTO.js";
import CoreTableColumnDataProviderDTO from "../Table/Column/CoreTableColumnDataProviderDTO.js";
import CoreLayoutDataAssignElementDTO from "../Layout/CoreLayoutDataAssignElementDTO.js";

export default class CoreProcessParamDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreTableColumnEditorDTO() {
        if (this.coreTableColumnEditorDTO && !(this.coreTableColumnEditorDTO instanceof BaseModel)) {
            this.coreTableColumnEditorDTO = ConvertUtil.ConvertGeneral(CoreTableColumnEditorDTO, this.coreTableColumnEditorDTO);
        }
        return this.coreTableColumnEditorDTO;
    }

    getCoreTableColumnDataProviderDTO() {
        if (this.coreTableColumnDataProviderDTO && !(this.coreTableColumnDataProviderDTO instanceof BaseModel)) {
            this.coreTableColumnDataProviderDTO = ConvertUtil.ConvertGeneral(CoreTableColumnDataProviderDTO, this.coreTableColumnDataProviderDTO);
        }
        return this.coreTableColumnDataProviderDTO;
    }

    getActive() {
        return this.active;
    }

    getIndex() {
        return this.index;
    }

    setCoreLayoutDataAssignElementDTOMap(coreLayoutDataAssignElementDTOMap) {
        this.coreLayoutDataAssignElementDTOMap = coreLayoutDataAssignElementDTOMap;
    }

    getCoreLayoutDataAssignElementDTOMap() {
        if (this.coreLayoutDataAssignElementDTOMap && !(this.coreLayoutDataAssignElementDTOMap instanceof Map)) {
            this.coreLayoutDataAssignElementDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreLayoutDataAssignElementDTO, this.coreLayoutDataAssignElementDTOMap);
        }
        return this.coreLayoutDataAssignElementDTOMap;
    }
}