import {WebTextEditor} from "../Text/WebTextEditor.js";

export default class WebPasswordEditor extends WebTextEditor {

    static registerKey() {
        return "WebPasswordEditor"
    };

    constructor() {
        super(true);
    }
}