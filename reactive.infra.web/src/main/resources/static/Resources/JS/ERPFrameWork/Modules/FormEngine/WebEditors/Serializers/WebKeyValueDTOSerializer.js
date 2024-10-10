import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import KeyValueDTO from "../../../../Communicate/Common/DataProvider/Impl/KeyValueDTO.js";

export default class WebKeyValueDTOSerializer extends WebEditorValueSerializer {
    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        let keyValueDTO;
        if (webEditorValue instanceof KeyValueDTO) {
            keyValueDTO = webEditorValue;
        } else {
            keyValueDTO = new KeyValueDTO();
            keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
            keyValueDTO.setDisplay(webEditorValue);
            keyValueDTO.setKey(webEditorValue);
        }
        return keyValueDTO;
    }

    serializeModelToDisplay(dataProviderString, coreWindowTabFieldDTO) {
        return dataProviderString != null ? dataProviderString.display : "";
    }
}