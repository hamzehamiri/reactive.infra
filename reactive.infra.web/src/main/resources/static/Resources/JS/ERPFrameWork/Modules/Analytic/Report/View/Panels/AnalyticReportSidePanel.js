import TabPanelHTML, {TabPanel_Mode} from "../../../../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import TabItem from "../../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import {FitLayout} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import AnalyticReportSidePanelFields from "./AnalyticReportSidePanelFields.js";

export default class AnalyticReportSidePanel extends TabPanelHTML {

    constructor() {
        super(TabPanel_Mode.Top);

        this.analyticReportSidePanelFields = new AnalyticReportSidePanelFields();

        this.tabItemFields = new TabItem();
        this.tabItemFields.setTitle("Fields");
        this.tabItemFields.setLayout(new FitLayout());
        this.tabItemFields.addItem(this.analyticReportSidePanelFields);

        this.addItem(this.tabItemFields);

        this.setActiveTabItem(this.tabItemFields);
    }

    getAnalyticReportSidePanelFields() {
        return this.analyticReportSidePanelFields;
    }
}