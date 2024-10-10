import {LayoutContainer} from "../Container/LayoutContainer.js";
import {SideLayout} from "../Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {ListView} from "../ListView/ListView.js";
import {SideLayoutData} from "../Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import {ListViewItemGenerator} from "../ListView/ListViewItemGenerator.js";
import {TemplateLayout} from "../Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import TemplateLayoutData from "../Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import {DragDrop} from "../DND/DragDrop.js";
import {ListViewDragDropSource} from "../DND/DragDropSources/ListViewDragDropSource.js";
import {LayoutContainerDragDropSource} from "../DND/DragDropSources/LayoutContainerDragDropSource.js";
import {FitLayout} from "../Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {DOM} from "../../Shared/Common/DOM.js";

export class DesignerPanel extends LayoutContainer {
    constructor() {
        super();

        let sideLayout = new SideLayout();
        sideLayout.setDistancePercent(10);

        this.setElement(DOM.createElement('div'));

        this.setLayout(sideLayout);

        this.listView = new ListView();
        this.listView.setLayout(new TemplateLayout('li'));
        this.listView.addItemData(ListViewItemGenerator.ItemData.Data1, TemplateLayoutData.factory(ListViewItemGenerator.ItemData.LayoutConfig.template));
        this.listView.addItemData(ListViewItemGenerator.ItemData.Data2, TemplateLayoutData.factory(ListViewItemGenerator.ItemData.LayoutConfig.template));
        this.listView.addItemData(ListViewItemGenerator.ItemData.Data3, TemplateLayoutData.factory(ListViewItemGenerator.ItemData.LayoutConfig.template));

        this.formLayout = new LayoutContainer();
        this.formLayout.setLayout(new FitLayout());
        this.formLayout.addStyleAttribute('background-color', 'red');

        this.addItem(this.listView, SideLayoutData.factory(SideLayoutData.Side.Left, 100, true, false, true, true));
        this.addItem(this.formLayout, SideLayoutData.factory(SideLayoutData.Side.Center, 100, true, false, true, true));

        let listViewDragDropSource = new ListViewDragDropSource(this.listView);
        let designerPanelDragDropSource = new LayoutContainerDragDropSource(this.formLayout);

        let dragDrop = new DragDrop();
        dragDrop.addDrag(listViewDragDropSource);
        dragDrop.addDrop(designerPanelDragDropSource);
        dragDrop.start();
    }
}