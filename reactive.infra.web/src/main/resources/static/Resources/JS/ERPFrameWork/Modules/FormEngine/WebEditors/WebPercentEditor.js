import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import WebTriggerEditorNew from "../../../../UIFrameWork/HTML/WebEditor/Common/WebTriggerEditorNew.js";

export default class WebPercentEditor extends WebTriggerEditorNew {

    static registerKey() {
        return "WebPercentEditor"
    };

    constructor() {
        super();

        this.setTargetDataFromOtherInputElement(true);
        this.setGeneratedInputElement(false);
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebComboBoxEditor[0]));
    }
}