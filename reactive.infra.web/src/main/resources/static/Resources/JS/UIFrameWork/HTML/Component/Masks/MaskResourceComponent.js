import {HTMLComponent} from "../HTMLComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";

export default class MaskResourceComponent extends HTMLComponent {

    constructor(arrayResourceStateModel) {
        super();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.MaskResourceComponent[0]));
        this.setElement(DOM.createElement('div'));

        this.getElement().setAttribute("class", this.getMaskResourceComponentClass());

        this.arrayResourceStateModel = arrayResourceStateModel;
    }

    getMaskResourceComponentClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.MaskResourceComponent[1].MaskResourceComponent);
    }
}