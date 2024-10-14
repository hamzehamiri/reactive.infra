import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";

export default class WebTreeContainer extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.getElement(), "DDD");
    }
}