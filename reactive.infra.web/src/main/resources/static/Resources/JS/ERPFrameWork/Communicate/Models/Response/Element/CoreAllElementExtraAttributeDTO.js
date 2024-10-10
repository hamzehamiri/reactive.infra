import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreTableColumnDataProviderDTO from "../Table/Column/CoreTableColumnDataProviderDTO.js";

export default class CoreAllElementExtraAttributeDTO extends BaseModel {
    constructor() {
        super();
    }

    getCoreAllElementId() {
        return this.coreAllElementId;
    }

    getCoreTableColumnDataProviderDTO() {
        if (this.coreTableColumnDataProviderDTO && !(this.coreTableColumnDataProviderDTO instanceof BaseModel)) {
            this.coreTableColumnDataProviderDTO = ConvertUtil.ConvertGeneral(CoreTableColumnDataProviderDTO, this.coreTableColumnDataProviderDTO);
        }
        return this.coreTableColumnDataProviderDTO;
    }
}