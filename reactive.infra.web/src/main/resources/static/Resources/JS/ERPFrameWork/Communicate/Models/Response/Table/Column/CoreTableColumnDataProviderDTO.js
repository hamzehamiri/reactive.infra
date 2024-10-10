import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreTableColumnDataProviderWithSerializerDTO from "./CoreTableColumnDataProviderWithSerializerDTO.js";

export default class CoreTableColumnDataProviderDTO extends BaseModel {
    constructor(name, coreTableColumnDataProviderTypeEnum) {
        super();
        this.setName(name);
    }

    getCoreTableColumnDataProviderTypeId() {
        return this.coreTableColumnDataProviderTypeId;
    }

    getCoreTableColumnDataProviderTypeRecordId() {
        return this.coreTableColumnDataProviderTypeRecordId;
    }

    getCoreTableColumnDataProviderWithSerializerDTO() {
        if (this.coreTableColumnDataProviderWithSerializerDTO && !(this.coreTableColumnDataProviderWithSerializerDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTableColumnDataProviderWithSerializerDTO = ConvertUtil.ConvertGeneral(CoreTableColumnDataProviderWithSerializerDTO, this.coreTableColumnDataProviderWithSerializerDTO);
        }
        return this.coreTableColumnDataProviderWithSerializerDTO;
    }
}