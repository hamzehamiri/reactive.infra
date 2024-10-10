import {WebTextEditor} from "../../../../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class WebTextEditorSimple extends WebTextEditor {
    constructor() {
        super();
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebTextEditorSimple[0]));
    }

    getInputClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditorSimple[1].WebTextEditorSimpleInput);
    }
}