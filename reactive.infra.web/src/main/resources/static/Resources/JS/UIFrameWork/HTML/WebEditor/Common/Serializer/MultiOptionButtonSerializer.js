import WebEditorValueSerializer from "./WebEditorValueSerializer.js";
import WebEditorModelKeyDisplayArray from "../WebEditorModelKeyDisplayArray.js";
import WebEditorModelKeyDisplay from "../WebEditorModelKeyDisplay.js";
import MultiOptionButtonEditorOriginalModel from "../../Button/MultiOptionButtonEditorOriginalModel.js";

export default class MultiOptionButtonSerializer extends WebEditorValueSerializer {

    convertRawToModel(webEditorValue) {
        if (webEditorValue instanceof WebEditorModelKeyDisplayArray) {
            let activeModel = null;
            webEditorValue.getMapValues().forEach(val => {
                if (val instanceof WebEditorModelKeyDisplay) {
                    let originalVal = val.getOriginal();
                    if (originalVal instanceof MultiOptionButtonEditorOriginalModel) {
                        if (originalVal.isActive())
                            activeModel = val;
                    }
                }
            });
            return activeModel;
        }
        return null;
    }
}