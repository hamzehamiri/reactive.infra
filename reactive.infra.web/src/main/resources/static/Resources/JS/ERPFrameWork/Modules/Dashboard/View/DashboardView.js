import BaseView from "../../Common/BaseView.js";
import {SideLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import DashboardSidePanel from "./SidePanel/DashboardSidePanel.js";
import {SideLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import {TemplateLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import {ListViewDragDropSource} from "../../../../UIFrameWork/HTML/DND/DragDropSources/ListViewDragDropSource.js";
import {DragDrop} from "../../../../UIFrameWork/HTML/DND/DragDrop.js";
import DashboardCenterContainerGadgetViews from "./Containers/DashboardCenterContainerGadgetViews.js";
import DashboardCenterContainerGadgetViewsDragDropSource from "./Containers/DashboardCenterContainerGadgetViewsDragDropSource.js";
import DashboardGadgetListView from "./Components/DashboardGadgetListView.js";
import AdvancedMenu from "../../../../UIFrameWork/HTML/Cells/Tree/AdvancedTree/Menu/AdvancedMenu.js";

export default class DashboardView extends BaseView {

    constructor() {
        super();
        this.setLayout(new SideLayout());
        this.dashboardSidePanel = new DashboardSidePanel();
        this.dashboardSidePanel.setContextMenu(new AdvancedMenu());
        this.dashboardCenterContainerGadgetViews = new DashboardCenterContainerGadgetViews();
        this.dashboardGadgets = new DashboardGadgetListView();
        this.dashboardGadgets.setContextMenu(new AdvancedMenu());
        this.dashboardGadgets.setLayout(new TemplateLayout('div'));

        this.addItem(this.dashboardSidePanel, SideLayoutData.factory(SideLayoutData.Side.Left, 250, true, false, true, true, 0, 0, 0, 0));
        this.addItem(this.dashboardCenterContainerGadgetViews, SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, false, false, 0, 0, 0, 0));
        this.addItem(this.dashboardGadgets, SideLayoutData.factory(SideLayoutData.Side.Right, 100, true, false, true, true, 0, 0, 0, 0));

        let listViewDashboardGadgetDrag = new ListViewDragDropSource(this.dashboardGadgets);
        let dashboardCenterContainerGadgetViewsDragDropSource = new DashboardCenterContainerGadgetViewsDragDropSource(this.dashboardCenterContainerGadgetViews);

        let dragDrop = new DragDrop();
        dragDrop.addDrag(listViewDashboardGadgetDrag);
        dragDrop.addDrop(dashboardCenterContainerGadgetViewsDragDropSource);
        dragDrop.start();
    }
}