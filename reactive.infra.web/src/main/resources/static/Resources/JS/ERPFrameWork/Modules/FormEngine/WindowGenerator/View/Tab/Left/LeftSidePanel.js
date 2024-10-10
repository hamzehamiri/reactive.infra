import HTMLContainer from "../../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import TabPanelHTML from "../../../../../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import {FitLayout} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import TabItem from "../../../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import ListField from "./ListField.js";
import ListLayout from "./ListLayout.js";
import ListWidget from "./ListWidget.js";

export default class LeftSidePanel extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new FitLayout());

        this.listField = new ListField();
        this.listLayout = new ListLayout();
        this.listWidget = new ListWidget();

        this.tabItemField = new TabItem();
        this.tabItemField.setLayout(new FitLayout());
        this.tabItemField.setTitle("Fields");
        this.tabItemField.addItem(this.listField);

        this.tabItemLayout = new TabItem();
        this.tabItemLayout.setLayout(new FitLayout());
        this.tabItemLayout.setTitle("Layouts");
        this.tabItemLayout.addItem(this.listLayout);

        this.tabItemWidget = new TabItem();
        this.tabItemWidget.setLayout(new FitLayout());
        this.tabItemWidget.setTitle("Widgets");
        this.tabItemWidget.addItem(this.listWidget);

        let tabPanel = new TabPanelHTML();
        tabPanel.addItem(this.tabItemField);
        tabPanel.addItem(this.tabItemLayout);
        tabPanel.addItem(this.tabItemWidget);

        this.addItem(tabPanel);
    }
}