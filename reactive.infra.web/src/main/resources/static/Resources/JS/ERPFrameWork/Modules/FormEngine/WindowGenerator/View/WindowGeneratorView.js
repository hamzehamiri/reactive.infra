import BaseView from "../../../Common/BaseView.js";
import WindowDesigner from "./WindowDesigner.js";
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class WindowGeneratorView extends BaseView {

    static registerKey() {
        return "WindowGeneratorModule";
    }

    constructor(windowGeneratorController) {
        super(windowGeneratorController);
        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.windowViewContainer = new HTMLContainer();
        this.designer = new WindowDesigner();

        this.addItem(this.windowViewContainer, RowLayoutData.factory(1, 0.5, 0, 0, 0, 0, true));
        this.addItem(this.designer, RowLayoutData.factory(1, 0.5, 0, 0, 0, 0, true));
    }

    getWindowViewContainer() {
        return this.windowViewContainer;
    }
}