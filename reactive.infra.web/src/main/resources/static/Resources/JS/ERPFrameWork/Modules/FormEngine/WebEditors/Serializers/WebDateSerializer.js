import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import EditorDate from "../../../../Communicate/Common/DataProvider/Impl/EditorDate.js";

export default class WebDateSerializer extends WebEditorValueSerializer {

    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        let modelData = new EditorDate();
        modelData.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        modelData.setDisplay(webEditorValue);
        modelData.setKey(webEditorValue);
        return modelData;
    }

    serializeModelToDisplay(dataProviderDate, coreWindowTabFieldDTO) {
        return dataProviderDate ? dataProviderDate.display : "";
    }
}