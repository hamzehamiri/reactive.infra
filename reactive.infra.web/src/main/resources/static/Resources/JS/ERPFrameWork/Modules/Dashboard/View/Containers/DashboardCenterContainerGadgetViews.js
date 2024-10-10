import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class DashboardCenterContainerGadgetViews extends HTMLContainer {
    constructor() {
        super();
        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.setScrollTypeY(HTMLComponent.ScrollType.Auto);
    }
}