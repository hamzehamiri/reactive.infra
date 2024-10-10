import WebEditorValueSerializer from "../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueSerializer.js";
import ListKeyValueDTO from "../../../../Communicate/Common/DataProvider/Impl/ListKeyValueDTO.js";

export default class WebKeyValueListDTOSerializer extends WebEditorValueSerializer {
    constructor(coreTableColumnDataProviderWithSerializerDTO) {
        super(coreTableColumnDataProviderWithSerializerDTO);
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        let keyValueDTO;
        if (webEditorValue instanceof ListKeyValueDTO) {
            keyValueDTO = webEditorValue;
        } else {
            keyValueDTO = new ListKeyValueDTO();
            keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(this.coreTableColumnDataProviderWithSerializerDTO);
            keyValueDTO.setDisplay(webEditorValue);
            keyValueDTO.setKey(webEditorValue);
        }
        return keyValueDTO;
    }

    serializeModelToDisplay(dataProviderString, coreWindowTabFieldDTO) {
        return dataProviderString.display;
    }
}