import Accordion from "../../../../../UIFrameWork/HTML/Accordion/Accordion.js";
import {FitLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import TreeGridDescriptor from "../../../../../UIFrameWork/HTML/Cells/Common/TreeGridDescriptor.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class DashboardSidePanelItems extends HTMLContainer {
    constructor() {
        super();

        this.setElement(DOM.createElement('div'));
        this.setLayout(new FitLayout())

        this.accordion = new Accordion();
        this.accordion.setTreeGridDescriptor(new TreeGridDescriptor("translate", "id", 'parentId'));

        this.addItem(this.accordion);
        this.bindTheme();
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getClassContainer());
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.DashboardSidePanelItems[0]));
    }

    getClassContainer() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardSidePanelItems[1].Container);
    }
}