import {Popup} from "../Popup/Popup.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";

export default class Menu extends Popup {
    constructor() {
        super();

        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Menu[0]));
    }

    onLoad() {
        super.onLoad();

        this.getElement().setAttribute('class', this.getMenuMasterDivClass());
    }

    getMenuMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Menu[1].MenuMasterDiv);
    }

    getMenuItemClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Menu[1].MenuItem);
    }

    getMenuItemTextClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Menu[1].MenuItemText);
    }
}