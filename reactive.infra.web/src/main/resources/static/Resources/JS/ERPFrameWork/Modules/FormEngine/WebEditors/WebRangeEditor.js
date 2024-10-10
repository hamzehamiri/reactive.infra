import {WebEditor} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";

export default class WebRangeEditor extends WebEditor {

    static registerKey() {
        return "WebRangeEditor";
    };

    constructor() {
        super();

        this.setGeneratedInputElement(true);
    }
}