import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {ListView} from "../../../../../../UIFrameWork/HTML/ListView/ListView.js";
import {RowLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {TemplateLayout} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class AnalyticReportSidePanelFields extends HTMLContainer {
    constructor() {
        super();

        this.listView = new ListView();
        this.listView.setLayout(new TemplateLayout('li'));

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.addItem(this.listView, RowLayoutData.factory(1, 1, 2, 2, 2, 2, true));
    }

    getListView() {
        return this.listView;
    }
}