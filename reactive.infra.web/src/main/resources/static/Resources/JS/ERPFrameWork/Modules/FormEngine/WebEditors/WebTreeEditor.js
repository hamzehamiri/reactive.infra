import {WebComboBox} from "../../../../UIFrameWork/HTML/WebEditor/Combobox/WebComboBox.js";
import WebTreeContainer from "./Containers/Tree/WebTreeContainer.js";

export default class WebTreeEditor extends WebComboBox {
    static registerKey() {
        return "WebTreeEditor";
    };

    constructor() {
        super();

        let view = new WebTreeContainer();
    }
}