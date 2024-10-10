import BaseView from "../../Common/BaseView.js";
import {SideLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import {HighChartComponent} from "../../../../UIFrameWork/HTML/Widget/Charts/Highcharts/HighChartComponent.js";
import {RowLayout, RowLayout_Mode} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import DropDownButton from "../../FormEngine/Toolbar/StandardButtons/DropDownButton.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {Util} from "../../../../UIFrameWork/Shared/Common/Util.js";
import ChartElementSidePanel from "./ChartElementSidePanel.js";
import HTMLContainer from "../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ChartElementView extends BaseView {
    constructor() {
        super();
        this.setLayout(new SideLayout());

        this.toolbarPanel = new HTMLContainer();
        this.toolbarPanel.setLayout(new RowLayout(RowLayout_Mode.Horizontal))
        this.chartElementSidePanel = new ChartElementSidePanel();
        this.heighChartPanel = new HighChartComponent();

        let lineChartJsonAttributeMap = Util.ConvertJsonToMap({
            "classButton": "btn_chart_type btn_general",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/Chart/line-chart.svg"
        });
        let pieChartJsonAttributeMap = Util.ConvertJsonToMap({
            "classButton": "btn_chart_type btn_general",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/Chart/pie-chart.svg"
        });

        let lineChartButton = new DropDownButton(null, lineChartJsonAttributeMap, null, true);
        let pieChartButton = new DropDownButton(null, pieChartJsonAttributeMap, null, true);

        this.toolbarPanel.addItem(lineChartButton, RowLayoutData.factory(100, 1, 2, 2, 2, 2, true));
        this.toolbarPanel.addItem(pieChartButton, RowLayoutData.factory(100, 1, 2, 2, 2, 2, true));

        this.addItem(this.toolbarPanel, SideLayoutData.factory(SideLayoutData.Side.Top, 60, true, false, true, true, 0, 0, 0, 0));
        this.addItem(this.chartElementSidePanel, SideLayoutData.factory(SideLayoutData.Side.Left, 550, true, false, true, true, 0, 0, 0, 0));
        this.addItem(this.heighChartPanel, SideLayoutData.factory(SideLayoutData.Side.Center, 1, true, false, true, true, 0, 0, 0, 0));
    }

    bindModelToUI(model) {
        super.bindModelToUI(model);
        this.chartElementSidePanel.bindModelToUI(model)
    }

    getChartElementSidePanel() {
        return this.chartElementSidePanel;
    }

    getHeightChartPanel() {
        return this.heighChartPanel;
    }
}