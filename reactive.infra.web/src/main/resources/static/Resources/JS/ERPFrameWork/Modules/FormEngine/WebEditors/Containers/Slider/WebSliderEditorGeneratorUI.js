import WebEditorValueGeneratorUI from "../../../../../../UIFrameWork/HTML/WebEditor/Common/Serializer/WebEditorValueGeneratorUI.js";
import WebSliderEditor from "../../WebSliderEditor.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";

export default class WebSliderEditorGeneratorUI extends WebEditorValueGeneratorUI {
    constructor(webEditor) {
        super(webEditor);
    }

    generateUi(value) {
        let rect = this.webEditor.getBoundingClientRect_Style();
        if (rect.width > 0) {
            if (this.webEditor instanceof WebSliderEditor) {
                let targetSliderDiv = this.webEditor.getSliderDiv();
                let xFinalLeft = value * rect.width;
                DOM.setLeft(targetSliderDiv, xFinalLeft);
            }
        }
    }
}