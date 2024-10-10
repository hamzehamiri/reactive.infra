import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import LeftSidePanel from "./Left/LeftSidePanel.js";
import CenterPanel from "./Center/CenterPanel.js";
import PropertiesPanel from "./Right/PropertiesPanel.js";
import {SideLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import {SideLayout} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {ListViewDragDropSource} from "../../../../../../UIFrameWork/HTML/DND/DragDropSources/ListViewDragDropSource.js";
import {
    LayoutContainerDragDropSource
} from "../../../../../../UIFrameWork/HTML/DND/DragDropSources/LayoutContainerDragDropSource.js";
import {DragDrop} from "../../../../../../UIFrameWork/HTML/DND/DragDrop.js";

export default class TabDesigner extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new SideLayout());

        let leftPanel = new LeftSidePanel();
        let centerPanel = new CenterPanel();
        let propertiesPanel = new PropertiesPanel();

        this.addItem(leftPanel , SideLayoutData.factory(SideLayoutData.Side.Left, 300, true, false, true, true, 0, 0, 0, 0));
        this.addItem(centerPanel , SideLayoutData.factory(SideLayoutData.Side.Center, 1, true, false, true, true, 0, 0, 0, 0));
        this.addItem(propertiesPanel , SideLayoutData.factory(SideLayoutData.Side.Right, 300, true, false, true, true, 0, 0, 0, 0));

        let listViewDragDropSource = new ListViewDragDropSource(leftPanel.listField.listView);
        let designerPanelDragDropSource = new LayoutContainerDragDropSource(centerPanel);

        let dragDrop = new DragDrop();
        dragDrop.addDrag(listViewDragDropSource);
        dragDrop.addDrop(designerPanelDragDropSource);
        dragDrop.start();
    }
}