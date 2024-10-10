import {FitLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import TabPanelHTML, {TabPanel_Mode} from "../../../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import DashboardSidePanelConfigs from "./DashboardSidePanelConfigs.js";
import TabItem from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import DashboardSidePanelItems from "./DashboardSidePanelItems.js";
import DashboardLayoutListView from "../Components/DashboardLayoutListView.js";
import {TemplateLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import AdvancedMenu from "../../../../../UIFrameWork/HTML/Cells/Tree/AdvancedTree/Menu/AdvancedMenu.js";

export default class DashboardSidePanel extends TabPanelHTML {

    constructor() {
        super(TabPanel_Mode.Top);

        this.dashboardSidePanelConfigs = new DashboardSidePanelConfigs();
        this.dashboardSidePanelItems = new DashboardSidePanelItems();
        this.dashboardLayoutListView = new DashboardLayoutListView();
        this.dashboardLayoutListView.setContextMenu(new AdvancedMenu());
        this.dashboardLayoutListView.setLayout(new TemplateLayout('li'));

        this.tabItemConfig = new TabItem();
        this.tabItemConfig.setLayout(new FitLayout());
        this.tabItemConfig.setTitle("Configs");
        this.tabItemConfig.addItem(this.dashboardSidePanelConfigs);

        this.tabItemDashboardLayoutListView = new TabItem();
        this.tabItemDashboardLayoutListView.setLayout(new FitLayout());
        this.tabItemDashboardLayoutListView.setTitle("DashboardLayout");
        this.tabItemDashboardLayoutListView.addItem(this.dashboardLayoutListView);

        this.tabItemItems = new TabItem();
        this.tabItemItems.setLayout(new FitLayout());
        this.tabItemItems.setTitle("Items");
        this.tabItemItems.addItem(this.dashboardSidePanelItems);

        this.addItem(this.tabItemConfig);
        this.addItem(this.tabItemDashboardLayoutListView);
        this.addItem(this.tabItemItems);

        this.setActiveTabItem(this.tabItemItems);
    }

    getDashboardSidePanelConfigs() {
        return this.dashboardSidePanelConfigs;
    }

    getDashboardSidePanelItems() {
        return this.dashboardSidePanelItems;
    }

    getTabItemConfig() {
        return this.tabItemConfig;
    }

    getTabItemItems() {
        return this.tabItemItems;
    }

    getTabItemDashboardLayoutListView() {
        return this.tabItemDashboardLayoutListView;
    }
}