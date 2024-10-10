import {ListView} from "../../../../../UIFrameWork/HTML/ListView/ListView.js";
import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";

export default class DashboardGadgetListView extends ListView {
    constructor() {
        super();

        this.setElement(DOM.createElement("div"));

        this.bindEvents();
        this.bindTheme();
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.DashboardGadgetListView[0]));
    }

    getContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewContainer);
    }

    getItemClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItem);
    }

    getItemHover() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItemHover);
    }

    getItemSelected() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItemSelected);
    }
}