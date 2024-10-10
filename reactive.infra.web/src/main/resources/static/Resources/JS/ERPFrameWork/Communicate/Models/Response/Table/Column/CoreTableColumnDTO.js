import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreTableColumnEditorDTO from "./CoreTableColumnEditorDTO.js";
import CoreTableColumnDataProviderDTO from "./CoreTableColumnDataProviderDTO.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";

export default class CoreTableColumnDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreTableColumnEditorDTO(coreTableColumnEditorDTO) {
        this.coreTableColumnEditorDTO = coreTableColumnEditorDTO;
    }

    getCoreTableColumnEditorDTO() {
        if (this.coreTableColumnEditorDTO && this.coreTableColumnEditorDTOConverted == null) {
            this.coreTableColumnEditorDTOConverted = ConvertUtil.ConvertGeneral(CoreTableColumnEditorDTO, this.coreTableColumnEditorDTO);
        }
        return this.coreTableColumnEditorDTOConverted;
    }

    getCoreTableColumnDataProviderDTO() {
        if (this.coreTableColumnDataProviderDTO && this.coreTableColumnDataProviderDTOConverted == null) {
            this.coreTableColumnDataProviderDTOConverted = ConvertUtil.ConvertGeneral(CoreTableColumnDataProviderDTO, this.coreTableColumnDataProviderDTO);
        }
        return this.coreTableColumnDataProviderDTOConverted;
    }

    setXmlQuerySelect(xmlQuerySelect) {
        this.xmlQuerySelect = xmlQuerySelect;
    }

    getXmlQuerySelect() {
        return this.xmlQuerySelect;
    }

    setCoreTableId(coreTableId) {
        this.coreTableId = coreTableId;
    }

    getCoreTableId() {
        return this.coreTableId;
    }

    setPk(pk) {
        this.pk = pk;
    }

    getPk() {
        return this.pk;
    }
}