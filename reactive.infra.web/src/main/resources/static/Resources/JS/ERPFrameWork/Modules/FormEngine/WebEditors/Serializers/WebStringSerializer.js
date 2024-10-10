import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import EditorString from "../../../../Communicate/Common/DataProvider/Impl/EditorString.js";

export default class WebStringSerializer extends WebEditorValueSerializer {
    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        let modelData = new EditorString();
        modelData.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        modelData.setDisplay(webEditorValue);
        modelData.setKey(webEditorValue);
        return modelData;
    }

    serializeModelToDisplay(dataProviderString, coreWindowTabFieldDTO) {
        return dataProviderString ? dataProviderString.display : "";
    }
}