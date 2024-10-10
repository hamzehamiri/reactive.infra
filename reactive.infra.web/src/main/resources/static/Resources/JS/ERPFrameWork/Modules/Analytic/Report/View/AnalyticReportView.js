import BaseView from "../../../Common/BaseView.js";
import PivotGridComponent from "../../../../../UIFrameWork/HTML/Cells/Pivot/PivotGridComponent.js";
import {SideLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import AnalyticReportSidePanel from "./Panels/AnalyticReportSidePanel.js";
import {DragDrop} from "../../../../../UIFrameWork/HTML/DND/DragDrop.js";
import AnalyticReportSidePanelFieldsListViewDragDropSource from "./Panels/AnalyticReportSidePanelFieldsListViewDragDropSource.js";
import AnalyticReportToolbar from "./Toolbar/AnalyticReportToolbar.js";

export default class AnalyticReportView extends BaseView {

    constructor() {
        super();
        this.setLayout(new SideLayout());

        this.analyticReportToolbar = new AnalyticReportToolbar();
        this.pivotGridComponent = new PivotGridComponent();
        this.analyticReportSidePanel = new AnalyticReportSidePanel();

        this.uiElements.set(AnalyticReportView.PivotGrid, this.pivotGridComponent);
        this.uiElements.set(AnalyticReportView.PivotSidePanel, this.analyticReportSidePanel);

        this.addItem(this.analyticReportToolbar, SideLayoutData.factory(SideLayoutData.Side.Top, 40, true, false, false, false, 0, 0, 0, 0));
        this.addItem(this.pivotGridComponent, SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, false, false, 0, 0, 0, 0));
        this.addItem(this.analyticReportSidePanel, SideLayoutData.factory(SideLayoutData.Side.Left, 250, true, false, true, true, 0, 0, 0, 0));

        let listViewFieldDrag = new AnalyticReportSidePanelFieldsListViewDragDropSource(this.analyticReportSidePanel.getAnalyticReportSidePanelFields().getListView());
        let rowListViewDragDrop = new AnalyticReportSidePanelFieldsListViewDragDropSource(this.pivotGridComponent.getFieldDropListView(PivotGridComponent.Region().Row));
        let columnListViewDragDrop = new AnalyticReportSidePanelFieldsListViewDragDropSource(this.pivotGridComponent.getFieldDropListView(PivotGridComponent.Region().Column));
        let dataListViewDragDrop = new AnalyticReportSidePanelFieldsListViewDragDropSource(this.pivotGridComponent.getFieldDropListView(PivotGridComponent.Region().Data));
        let filterListViewDragDrop = new AnalyticReportSidePanelFieldsListViewDragDropSource(this.pivotGridComponent.getFieldDropListView(PivotGridComponent.Region().Filter));

        let dragDrop = new DragDrop();
        // dragDrop.addDrag(rowListViewDragDrop);
        dragDrop.addDrag(listViewFieldDrag);
        dragDrop.addDrop(rowListViewDragDrop);
        // dragDrop.addDrop(listViewFieldDrag);
        dragDrop.addDrop(columnListViewDragDrop);
        dragDrop.addDrop(dataListViewDragDrop);
        dragDrop.addDrop(filterListViewDragDrop);
        dragDrop.start();
    }

    getPivotGridComponent() {
        return this.uiElements.get(AnalyticReportView.PivotGrid);
    }

    getAnalyticReportSidePanel() {
        return this.analyticReportSidePanel;
    }

    getAnalyticReportToolbar() {
        return this.analyticReportToolbar;
    }
}

AnalyticReportView.PivotGrid = "PivotGrid";
AnalyticReportView.PivotSidePanel = "PivotSidePanel";