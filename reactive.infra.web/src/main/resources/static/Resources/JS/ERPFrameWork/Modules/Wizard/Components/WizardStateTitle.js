import FlexLayout, {FlexDirection} from "../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import HTMLContainer from "../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class WizardStateTitle extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new FlexLayout(FlexDirection.row));

        this.bindTheme();
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.getElement(), this.getWizardTitleBarMasterContainerClass());
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.WizardComponentStateTitleBar[0]));
    }

    getWizardTitleBarMasterContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WizardComponentStateTitleBar[1].WizardTitleBarMasterContainer);
    }
}