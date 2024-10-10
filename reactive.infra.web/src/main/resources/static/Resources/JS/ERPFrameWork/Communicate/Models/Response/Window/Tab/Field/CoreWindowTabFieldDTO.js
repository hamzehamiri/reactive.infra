import {BaseModel} from "../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreTableColumnDTO from "../../../Table/Column/CoreTableColumnDTO.js";
import CoreTableColumnEditorDTO from "../../../Table/Column/CoreTableColumnEditorDTO.js";
import CoreTableColumnDataProviderDTO from "../../../Table/Column/CoreTableColumnDataProviderDTO.js";
import ConvertUtil from "../../../../../Common/ConvertUtil.js";
import CoreLayoutDataAssignElementDTO from "../../../Layout/CoreLayoutDataAssignElementDTO.js";

export default class CoreWindowTabFieldDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreTabId(coreTabId) {
        this.coreTabId = coreTabId;
    }

    getCoreTabId() {
        return this.coreTabId;
    }

    setCoreTableColumnDTO(coreTableColumnDTO) {
        this.coreTableColumnDTO = coreTableColumnDTO;
    }

    getCoreTableColumnDTO() {
        if (this.coreTableColumnDTO && !(this.coreTableColumnDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTableColumnDTO = ConvertUtil.ConvertGeneral(CoreTableColumnDTO, this.coreTableColumnDTO);
        }
        return this.coreTableColumnDTO;
    }

    getCoreTableColumnEditorDTO() {
        if (this.coreTableColumnEditorDTO && !(this.coreTableColumnEditorDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTableColumnEditorDTO = ConvertUtil.ConvertGeneral(CoreTableColumnEditorDTO, this.coreTableColumnEditorDTO);
        }
        return this.coreTableColumnEditorDTO;
    }

    getCoreTableColumnDataProviderDTO() {
        if (this.coreTableColumnDataProviderDTO && !(this.coreTableColumnDataProviderDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTableColumnDataProviderDTO = ConvertUtil.ConvertGeneral(CoreTableColumnDataProviderDTO, this.coreTableColumnDataProviderDTO);
        }
        return this.coreTableColumnDataProviderDTO;
    }

    getColumnIndex() {
        return this.columnIndex;
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