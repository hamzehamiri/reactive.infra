import {HighChartComponent} from "./HighChartComponent.js";
import {HighChartOptionsPanel} from "./HighChartOptionsPanel.js";
import {SideLayout} from "../../../Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";

export class HighChartPanel extends HTMLContainer {
    constructor() {
        super();

        this.highChartComponent = new HighChartComponent();
        this.highChartOptionsPanel = new HighChartOptionsPanel();

        let sideLayout = new SideLayout();

        this.setLayout(sideLayout);

        this.addItem(this.highChartOptionsPanel, SideLayoutData.factory(SideLayoutData.Side.Left, 100, true, false, true, true));
        this.addItem(this.highChartComponent, SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, true, true));
    }
}