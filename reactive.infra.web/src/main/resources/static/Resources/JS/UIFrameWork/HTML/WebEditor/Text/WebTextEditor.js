import {WebEditor} from "../Common/WebEditor.js";
import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import {DOM} from "../../../Shared/Common/DOM.js";

export class WebTextEditor extends WebEditor {
    static registerKey() {
        return "WebTextEditor"
    };

    constructor(passwordMode) {
        super();

        this.passwordMode = passwordMode;

        this.bindTheme();
        this.setGeneratedInputElement(true);
        this.setOnlineTextInputMonitor(true, 1500);
    }

    onAttach(parentElement) {
        super.onAttach(parentElement);
        let inputElement = this.getDataElement().get(WebEditor.InputElement);
        if (inputElement && this.passwordMode) {
            DOM.setAttribute(inputElement, 'type', 'password');
        }
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebTextEditor[0]));
    }

    setWidth(width) {
        super.setWidth(width);
        if (this.getInputElement()) {
            this.getInputElement().style['width'] = width + "px";
        }
    }

    setSize(width, height) {
        super.setSize(width, height);
        this.setWidth(width);
    }

    getInputClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorInput);
    }

    getSpanPlaceHolderFieldSetClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSet);
    }

    getSpanPlaceHolderFieldSetLegendClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegend);
    }

    getSpanPlaceHolderFieldSetLegendSpanClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegendSpan);
    }
}