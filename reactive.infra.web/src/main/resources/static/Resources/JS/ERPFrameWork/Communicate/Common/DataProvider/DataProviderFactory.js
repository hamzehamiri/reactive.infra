import GlobalFactoryRegister from "../../../../UIFrameWork/Shared/Common/GlobalFactoryRegister.js";
import SerializerFactory from "../../../Modules/FormEngine/WebEditors/Serializers/SerializerFactory.js";
import DataProviderAbstract from "./DataProviderAbstract.js";
import CoreTableColumnDataProviderSerializerDTO from "../../Models/Response/Table/Column/CoreTableColumnDataProviderSerializerDTO.js";
import EditorLong from "./Impl/EditorLong.js";
import EditorDate from "./Impl/EditorDate.js";
import EditorString from "./Impl/EditorString.js";
import KeyValueDTO from "./Impl/KeyValueDTO.js";
import EditorCron from "./Impl/EditorCron.js";
import EditorBoolean from "./Impl/EditorBoolean.js";
import ListKeyValueDTO from "./Impl/ListKeyValueDTO.js";
import EditorAttachment from "./Impl/EditorAttachment.js";

export default class DataProviderFactory {
    static Init() {
        DataProviderFactory.dataProviderMap = new Map();
        GlobalFactoryRegister.register("DataProviderFactory", this);

        DataProviderFactory.register(SerializerFactory.Serializers.dateTypeSerializer, EditorDate);
        DataProviderFactory.register(SerializerFactory.Serializers.longTypeSerializer, EditorLong);
        DataProviderFactory.register(SerializerFactory.Serializers.stringTypeSerializer, EditorString);
        DataProviderFactory.register(SerializerFactory.Serializers.coreTableSerializer, KeyValueDTO);
        DataProviderFactory.register(SerializerFactory.Serializers.keyValueDTOTypeSerializer, KeyValueDTO);
        DataProviderFactory.register(SerializerFactory.Serializers.keyValueListDTOTypeSerializer, ListKeyValueDTO);
        DataProviderFactory.register(SerializerFactory.Serializers.AttachmentTypeSerializer, EditorAttachment);
        DataProviderFactory.register(SerializerFactory.Serializers.cronTypeSerializer, EditorCron);
        DataProviderFactory.register(SerializerFactory.Serializers.booleanTypeSerializer, EditorBoolean);
    }

    static factory(coreTableColumnDataProviderSerializerDTO) {
        if (coreTableColumnDataProviderSerializerDTO instanceof CoreTableColumnDataProviderSerializerDTO) {
            return DataProviderFactory.dataProviderMap.get(coreTableColumnDataProviderSerializerDTO.getClientRegisterKey());
        }
    }

    static register(coreTableColumnDataProviderSerializerDTO, dataProviderInterface) {
        if (coreTableColumnDataProviderSerializerDTO instanceof CoreTableColumnDataProviderSerializerDTO && dataProviderInterface.prototype instanceof DataProviderAbstract) {
            DataProviderFactory.dataProviderMap.set(coreTableColumnDataProviderSerializerDTO.getClientRegisterKey(), dataProviderInterface);
        }
    }
}