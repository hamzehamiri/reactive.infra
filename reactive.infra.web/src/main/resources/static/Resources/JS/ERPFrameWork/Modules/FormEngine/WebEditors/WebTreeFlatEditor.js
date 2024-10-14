import {WebEditor} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import WebTreeContainer from "./Containers/Tree/WebTreeContainer.js";

export default class WebTreeFlatEditor extends WebEditor {
    static registerKey() {
        return "WebTreeFlatEditor";
    };

    constructor() {
        super();

        this.setGeneratedInputElement(false);
        this.setActivePlaceHolder(false);

        this.view = new WebTreeContainer();
    }

    setSize(width, height) {
        super.setSize(width, height);

        this.view.setSize(width, height);
        this.view.setPosition(0, 0);
    }

    onLoad() {
        super.onLoad();

        this.view.setParent(this);
        this.view.onAttach(this.getElement());
    }
}