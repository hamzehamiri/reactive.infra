import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class MaskComponent extends HTMLComponent {
    constructor() {
        super();

        this.divIcon = DOM.createElement("div");
        this.pTag = DOM.createElement("div");

        let master = DOM.createElement('div');
        master.appendChild(this.divIcon);

        this.setElement(master);
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.MaskComponent[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.divIcon, this.getMaskComponentIconClass());
        DOM.addClassName(this.getElement(), this.getMaskComponentMasterClass());
    }

    getMaskComponentMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentMaster);
    }

    getMaskComponentIconClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentIcon);
    }

    getMaskComponentTitleClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentTitle);
    }
}