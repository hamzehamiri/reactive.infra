import WebTriggerEditorNew from "../../../../UIFrameWork/HTML/WebEditor/Common/WebTriggerEditorNew.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {ComboBoxPopup} from "../../../../UIFrameWork/HTML/WebEditor/Combobox/Container/ComboBoxPopup.js";
import {RowLayout, RowLayout_Mode} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import WebCronEditorGeneratorUI from "./Containers/Cron/WebCronEditorGeneratorUI.js";

export default class WebCronEditor extends WebTriggerEditorNew {
    static registerKey() {
        return "WebCronEditor";
    };

    constructor() {
        super();

        let popUp = new ComboBoxPopup();
        popUp.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.setTargetDataFromOtherInputElement(true);
        this.setGeneratedInputElement(true);
        // this.setWebEditorValueGeneratorUI(new WebCronEditorGeneratorUI(this));
        this.bindTheme();
        this.setPopUp(popUp);
        this.generateBaseTriggerEditor();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebComboBoxEditor[0]));
    }

    getTriggerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorTrigger);
    }
}