import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import TabDesigner from "./Tab/TabDesigner.js";
import TabList from "./Window/TabList.js";
import TabTreeView from "./Window/TabTreeView.js";
import {
    RowLayout,
    RowLayout_Mode
} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";

export default class WindowDesigner extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        let tabList = new TabList();
        let tabTreeView = new TabTreeView();
        let tabDesigner = new TabDesigner();

        this.addItem(tabList, RowLayoutData.factory(300, 1, 0, 0, 0, 0, true));
        this.addItem(tabTreeView, RowLayoutData.factory(300, 1, 0, 0, 0, 0, true));
        this.addItem(tabDesigner, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
    }
}