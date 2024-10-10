import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import Menu from "../../../Menu/Menu.js";

export default class PivotFieldComponent extends HTMLComponent {
    constructor() {
        super();
        this.textElement = DOM.createElement('span');
        this.iconElement = DOM.createElement('span');

        let menu = new Menu();
        menu.setWidth(300);
        menu.setBaseHeight(300);

        let masterEl = DOM.createElement('div');
        masterEl.appendChild(this.textElement);
        masterEl.appendChild(this.iconElement);

        this.setElement(masterEl);
        this.setContextMenu(menu);

        this.bindTheme();
    }

    setLabelTitle(title) {
        this.title = title;
        if (this.getAttached()) {
            this.textElement.innerHTML = title;
        }
    }

    onLoad() {
        super.onLoad();

        this.setLabelTitle(this.title);

        DOM.addClassName(this.getElement(), this.getPivotFieldComponent_MasterClass());
        DOM.addClassName(this.textElement, this.getPivotFieldComponent_TitleClass());
        DOM.addClassName(this.iconElement, this.getPivotFieldComponent_FilterIcon_NoneClass());
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.PivotFieldComponent[0]));
    }

    getPivotFieldComponent_MasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_Master);
    }

    getPivotFieldComponent_TitleClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_Title);
    }

    getPivotFieldComponent_FilterIcon_FilterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_FilterIcon_Filter);
    }

    getPivotFieldComponent_FilterIcon_NoneClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_FilterIcon_None);
    }
}