import GlobalFactoryRegister from "../../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";
import CoreTableColumnDataProviderSerializerDTO from "../../../../Communicate/Models/Response/Table/Column/CoreTableColumnDataProviderSerializerDTO.js";
import CoreTableColumnDataProviderSerializerConstant from "../../../../Communicate/Models/Response/Table/Column/CoreTableColumnDataProviderSerializerConstant.js";
import WebDateSerializer from "./WebDateSerializer.js";
import WebLongSerializer from "./WebLongSerializer.js";
import WebStringSerializer from "./WebStringSerializer.js";
import WebKeyValueDTOSerializer from "./WebKeyValueDTOSerializer.js";
import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import WebBooleanSerializer from "./WebBooleanSerializer.js";
import WebCronSerializer from "./WebCronSerializer.js";
import WebKeyValueListDTOSerializer from "./WebKeyValueListDTOSerializer.js";
import WebAttachmentTypeSerializer from "./WebAttachmentTypeSerializer.js";

export default class SerializerFactory {

    static Init() {
        GlobalFactoryRegister.register("SerializerFactory", this);
        SerializerFactory.mapSerializerClazz = new Map();

        SerializerFactory.register(SerializerFactory.Serializers.dateTypeSerializer, WebDateSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.longTypeSerializer, WebLongSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.stringTypeSerializer, WebStringSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.coreTableSerializer, WebKeyValueDTOSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.keyValueDTOTypeSerializer, WebKeyValueDTOSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.keyValueListDTOTypeSerializer, WebKeyValueListDTOSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.AttachmentTypeSerializer, WebAttachmentTypeSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.booleanTypeSerializer, WebBooleanSerializer);
        SerializerFactory.register(SerializerFactory.Serializers.cronTypeSerializer, WebCronSerializer);
    }

    static factory(coreTableColumnDataProviderSerializerDTO) {
        if (coreTableColumnDataProviderSerializerDTO instanceof CoreTableColumnDataProviderSerializerDTO)
            return SerializerFactory.mapSerializerClazz.get(coreTableColumnDataProviderSerializerDTO.getClientRegisterKey());
        return null;
    }

    static register(coreTableColumnDataProviderSerializerDTO, serializerClazz) {
        if (coreTableColumnDataProviderSerializerDTO instanceof CoreTableColumnDataProviderSerializerDTO && serializerClazz.prototype instanceof WebEditorValueSerializer) {
            SerializerFactory.mapSerializerClazz.set(coreTableColumnDataProviderSerializerDTO.getClientRegisterKey(), serializerClazz);
        }
    }
}

SerializerFactory.Serializers = {
    dateTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.DateTypePrimarySerializer.getKey()),
    longTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.NumberTypePrimarySerializer.getKey()),
    stringTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.StringTypePrimarySerializer.getKey()),
    coreTableSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.CoreTableSerializer.getKey()),
    keyValueDTOTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.KeyValueTableSerializer.getKey()),
    keyValueListDTOTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.KeyValueListSerializer.getKey()),
    AttachmentTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.AttachmentTypeSerializer.getKey()),
    booleanTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.BooleanTypePrimarySerializer.getKey()),
    cronTypeSerializer: new CoreTableColumnDataProviderSerializerDTO(CoreTableColumnDataProviderSerializerConstant.Attrib.Serializer.CronTypePrimarySerializer.getKey())
}