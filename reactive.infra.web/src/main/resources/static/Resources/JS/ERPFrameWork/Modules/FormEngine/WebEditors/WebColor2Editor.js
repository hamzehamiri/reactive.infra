import {WebEditor} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";

export default class WebColor2Editor extends WebEditor {
    static registerKey() {
        return "WebColorEditor2";
    };

    constructor() {
        super();

        this.setGeneratedInputElement(true);
    }
}