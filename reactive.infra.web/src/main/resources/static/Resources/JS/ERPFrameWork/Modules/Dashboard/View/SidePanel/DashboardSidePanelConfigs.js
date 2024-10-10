import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class DashboardSidePanelConfigs extends HTMLContainer {
    constructor() {
        super();
        this.setElement(DOM.createElement('div'));

        this.bindTheme();
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getClassContainer());
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.DashboardSidePanelConfigs[0]));
    }

    getClassContainer() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardSidePanelConfigs[1].Container);
    }
}