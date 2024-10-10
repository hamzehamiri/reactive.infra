import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import EditorCron from "../../../../Communicate/Common/DataProvider/Impl/EditorCron.js";

export default class WebCronSerializer extends WebEditorValueSerializer {
    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        let modelData = new EditorCron();
        modelData.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        modelData.setDisplay(webEditorValue);
        modelData.setKey(webEditorValue);
        return modelData;
    }

    serializeModelToDisplay(dataProviderString, coreWindowTabFieldDTO) {
        return dataProviderString ? dataProviderString.display : "";
    }
}