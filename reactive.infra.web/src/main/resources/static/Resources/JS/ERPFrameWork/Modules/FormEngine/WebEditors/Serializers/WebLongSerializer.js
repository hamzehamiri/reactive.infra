import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import EditorLong from "../../../../Communicate/Common/DataProvider/Impl/EditorLong.js";

export default class WebLongSerializer extends WebEditorValueSerializer {
    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        let modelData = new EditorLong();
        modelData.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
        modelData.setDisplay(webEditorValue);
        modelData.setKey(webEditorValue);
        return modelData;
    }

    serializeModelToDisplay(dataProviderLong, coreWindowTabFieldDTO) {
        return dataProviderLong ? dataProviderLong.display : "";
    }
}