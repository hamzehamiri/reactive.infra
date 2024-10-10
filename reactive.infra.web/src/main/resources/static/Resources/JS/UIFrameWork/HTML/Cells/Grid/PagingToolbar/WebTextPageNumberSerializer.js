import WebEditorValueSerializer from "../../../WebEditor/Common/Serializer/WebEditorValueSerializer.js";

export default class WebTextPageNumberSerializer extends WebEditorValueSerializer {
    constructor() {
        super();
    }

    convertRawToModel(webEditorValue, coreWindowTabFieldDTO) {
        return webEditorValue ? Number.parseInt(webEditorValue) : 0;
    }

    serializeModelToDisplay(webEditorValue, coreWindowTabFieldDTO) {
        return super.serializeModelToDisplay(webEditorValue, coreWindowTabFieldDTO);
    }
}