import {ListView} from "../../../../../UIFrameWork/HTML/ListView/ListView.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class DashboardLayoutListView extends ListView {
    constructor() {
        super();

        this.setElement(DOM.createElement("div"));

        this.bindEvents();
        this.bindTheme();
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.DashboardLayoutListView[0]));
    }

    getContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewContainer);
    }

    getItemClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItem);
    }

    getItemHover() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItemHover);
    }

    getItemSelected() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItemSelected);
    }
}