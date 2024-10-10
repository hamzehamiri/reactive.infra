import {Popup} from "../Popup/Popup.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import {HTMLComponent} from "../Component/HTMLComponent.js";

export class GlobalFloatButtonWidget extends Popup {
    constructor() {
        super(true, false, true);

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.GlobalFloatButton[0]));

        this.setHideOnOtherClick(false);
        this.setBaseHeight(null);

        let icon = "<svg class=\"icon icon-menu-toggle\" aria-hidden=\"true\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"  x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\">\n" +
            "\t<g class=\"svg-menu-toggle\">\n" +
            "\t\t<path class=\"line line-1\" d=\"M5 13h90v14H5z\"/>\n" +
            "\t\t<path class=\"line line-2\" d=\"M5 43h90v14H5z\"/>\n" +
            "\t\t<path class=\"line line-3\" d=\"M5 73h90v14H5z\"/>\n" +
            "\t</g>\n" +
            "</svg>";

        this.setHtml(icon);
        this.setScrollTypeY(HTMLComponent.ScrollType.Hidden);
    }
}