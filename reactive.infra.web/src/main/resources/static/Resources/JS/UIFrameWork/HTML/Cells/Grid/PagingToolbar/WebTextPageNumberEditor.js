import {WebTextEditor} from "../../../WebEditor/Text/WebTextEditor.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import WebTextPageNumberSerializer from "./WebTextPageNumberSerializer.js";

export default class WebTextPageNumberEditor extends WebTextEditor {
    constructor() {
        super();
        this.setTargetDataFromOtherInputElement(true);
        this.setWebEditorValueSerializer(new WebTextPageNumberSerializer(this));
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebTextPageNumberEditor[0]));
    }

    getInputClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorInput);
    }

    getSpanPlaceHolderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorSpanPlaceHolder);
    }

    getSpanPlaceHolderFocusClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorSpanPlaceHolderFocusText);
    }

}