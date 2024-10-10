import WebTriggerEditorNew from "../../../../UIFrameWork/HTML/WebEditor/Common/WebTriggerEditorNew.js";
import WebColorEditorContainer from "./Containers/Color/WebColorEditorContainer.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {ComboBoxPopup} from "../../../../UIFrameWork/HTML/WebEditor/Combobox/Container/ComboBoxPopup.js";
import ConfirmPanel, {ConfirmPanelEvent} from "../../Common/Confirm/ConfirmPanel.js";
import {RowLayout, RowLayout_Mode} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import WebColorEditorGeneratorUI from "./Containers/Color/WebColorEditorGeneratorUI.js";

export default class WebColorEditor extends WebTriggerEditorNew {

    static registerKey() {
        return "WebColorEditor";
    };

    constructor() {
        super();

        this.colorContainer = new WebColorEditorContainer();
        let confirmPanel = new ConfirmPanel();
        confirmPanel.addListener(ConfirmPanelEvent.AcceptEvent, () => {
            this.setValue(this.colorContainer.bindUiToModel());
            this.popUp.hide();
        });
        confirmPanel.addListener(ConfirmPanelEvent.CancelEvent, () => {
            this.popUp.hide();
        });

        this.popUp = new ComboBoxPopup();
        this.popUp.setMinWidth(200);
        this.popUp.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.popUp.addItem(this.colorContainer, RowLayoutData.factory(1, 1, 1, 1, 1, 1, true));
        this.popUp.addItem(confirmPanel, RowLayoutData.factory(1, 30, 1, 1, 1, 1, true));

        this.setTargetDataFromOtherInputElement(true);
        this.setGeneratedInputElement(false);
        this.setWebEditorValueGeneratorUI(new WebColorEditorGeneratorUI(this));
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebComboBoxEditor[0]));
        this.setPopUp(this.popUp);
        this.generateBaseTriggerEditor();
    }

    getTriggerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorTrigger);
    }
}