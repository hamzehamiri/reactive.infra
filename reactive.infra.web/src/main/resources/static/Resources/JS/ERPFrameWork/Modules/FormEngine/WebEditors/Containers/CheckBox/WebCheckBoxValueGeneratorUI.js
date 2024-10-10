import WebEditorValueGeneratorUI from "../../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueGeneratorUI.js";
import {WebCheckBoxEditor} from "../../WebCheckBoxEditor.js";
import DataProviderAbstract from "../../../../../Communicate/Common/DataProvider/DataProviderAbstract.js";

export default class WebCheckBoxValueGeneratorUI extends WebEditorValueGeneratorUI {
    constructor(webEditor) {
        super(webEditor);
    }

    generateUi(value) {
        if (this.webEditor instanceof WebCheckBoxEditor) {
            if (value instanceof DataProviderAbstract) {
                let keyValue = value.getKey();
                WebCheckBoxValueGeneratorUI.convertData(keyValue, this.webEditor.icon);
            } else if (value && value.constructor === String) {
                WebCheckBoxValueGeneratorUI.convertData(value, this.webEditor.icon);
            } else {
                WebCheckBoxValueGeneratorUI.convertData(null, this.webEditor.icon);
            }
        }
    }

    static convertData(keyValue, iconTag) {
        if (keyValue === null) {
            iconTag.setAttribute("src", "Resources/Themes/IMG/CheckBox/none.svg");
        } else if (keyValue === 'false') {
            iconTag.setAttribute("src", "Resources/Themes/IMG/CheckBox/unchecked.svg");
        } else if (keyValue === 'true') {
            iconTag.setAttribute("src", "Resources/Themes/IMG/CheckBox/checked.svg");
        }
    }
}