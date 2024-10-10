import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";

export class ButtonHeader extends HTMLComponent {
    constructor() {
        super();

        let btn = document.createElement('div');
        let gridStyle = RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.StandardGrid[0]);
        btn.setAttribute('class', gridStyle[UiFrameWorkComponent.Components.StandardGrid[1].ButtonHeader][0]);

        this.setElement(btn);
    }
}