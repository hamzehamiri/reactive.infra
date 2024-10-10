import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreTableColumnDataProviderSerializerDTO from "./CoreTableColumnDataProviderSerializerDTO.js";

export default class CoreTableColumnDataProviderWithSerializerDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreTableColumnDataProviderTypeEnum(coreTableColumnDataProviderTypeEnum) {
        this.coreTableColumnDataProviderTypeEnum = coreTableColumnDataProviderTypeEnum;
    }

    getCoreTableColumnDataProviderTypeEnum() {
        return this.coreTableColumnDataProviderTypeEnum;
    }

    setCoreTableColumnDataProviderSerializerDTO(coreTableColumnDataProviderSerializerDTO) {
        this.coreTableColumnDataProviderSerializerDTO = coreTableColumnDataProviderSerializerDTO;
    }

    getCoreTableColumnDataProviderSerializerDTO() {
        if (this.coreTableColumnDataProviderSerializerDTO && !(this.coreTableColumnDataProviderSerializerDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTableColumnDataProviderSerializerDTO = ConvertUtil.ConvertGeneral(CoreTableColumnDataProviderSerializerDTO, this.coreTableColumnDataProviderSerializerDTO);
        }
        return this.coreTableColumnDataProviderSerializerDTO;
    }
}