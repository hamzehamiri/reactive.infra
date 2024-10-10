import {BaseModel} from "../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../ConvertUtil.js";
import CoreTableColumnDataProviderWithSerializerDTO from "../../Models/Response/Table/Column/CoreTableColumnDataProviderWithSerializerDTO.js";
import CoreTableColumnDataProviderSerializerConstant from "../../Models/Response/Table/Column/CoreTableColumnDataProviderSerializerConstant.js";

export default class DataProviderAbstract extends BaseModel {

    getCoreTableColumnDataProviderWithSerializer() {
        if (this.coreTableColumnDataProviderWithSerializerDTO && !(this.coreTableColumnDataProviderWithSerializerDTO.constructor.prototype instanceof BaseModel)) {
            this.coreTableColumnDataProviderWithSerializerDTO = ConvertUtil.ConvertGeneral(CoreTableColumnDataProviderWithSerializerDTO, this.coreTableColumnDataProviderWithSerializerDTO);
        }
        return this.coreTableColumnDataProviderWithSerializerDTO;
    }

    setCoreTableColumnDataProviderWithSerializerDTO(coreTableColumnDataProviderWithSerializerDTO) {
        this.coreTableColumnDataProviderWithSerializerDTO = coreTableColumnDataProviderWithSerializerDTO;
    }

    getKey() {
        return this.key;
    }

    setDisplay(display) {
        this.display = display;
    }

    setKey(key) {
        this.key = key;
    }

    setOriginalData(originalData) {
        this.originalData = originalData;
    }

    getOriginalData() {
        return this.originalData;
    }

    getDisplay() {
        return this.display;
    }
}

DataProviderAbstract.DataModelRegistry = () => {
    return Object.freeze({
        DataModelRegistry_DataProviderDate: Symbol(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.DateTypePrimarySerializer.key),
        DataModelRegistry_DataProviderLong: Symbol(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.NumberTypePrimarySerializer.key),
        DataModelRegistry_DataProviderString: Symbol(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.StringTypePrimarySerializer.key),
        DataModelRegistry_KeyValueDTO: Symbol(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.KeyValueTableSerializer.key),
        DataModelRegistry_ListKeyValueDTO: Symbol(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.KeyValueListSerializer.key),
        DataModelRegistry_AttachmentTypePrimarySerializer: Symbol(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.AttachmentTypeSerializer.key),
        DataModelRegistry_DataProviderBoolean: Symbol(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.BooleanTypePrimarySerializer.key),
    });
}