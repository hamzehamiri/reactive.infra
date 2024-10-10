import WebTriggerEditorNew from "../../../../UIFrameWork/HTML/WebEditor/Common/WebTriggerEditorNew.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class WebNumberEditor extends WebTriggerEditorNew {

    static registerKey() {
        return "WebNumberEditor"
    };

    constructor() {
        super();

        this.setTargetDataFromOtherInputElement(true);
        this.setGeneratedInputElement(true);
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebNumberEditor[0]));
    }

    getWebNumberEditorInputClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorInput);
    }

    getWebNumberEditorAcceleratorSpinnerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorAcceleratorSpinner);
    }

    getWebNumberEditorNormalSpinnerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorNormalSpinner);
    }
}