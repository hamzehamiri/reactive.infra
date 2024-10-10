import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import {PopupCalendar} from "./Container/PopupCalendar.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import WebTriggerEditorNew from "../Common/WebTriggerEditorNew.js";
import {ComboBoxPopup} from "../Combobox/Container/ComboBoxPopup.js";
import {FitLayout} from "../../Container/Layout/Sizeable/Normal/Fit/FitLayout.js";

export class WebDateEditor extends WebTriggerEditorNew {
    static registerKey() {
        return "WebDateEditor"
    };

    constructor() {
        super();

        this.popupCalendar = new PopupCalendar();

        this.popUp = new ComboBoxPopup();
        this.popUp.setLayout(new FitLayout());
        this.popUp.addItem(this.popupCalendar);

        this.addListener(EventFrameWork.event.Components.Combobox.ShowPopUp, this.serviceOnShowPopUp, this);
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebDateEditor[0]));
        this.setPopUp(this.popUp);
        this.setGeneratedInputElement(true);
        this.generateBaseTriggerEditor();
    }

    serviceOnShowPopUp() {
        let dateValue = this.getValue();
        if (dateValue && dateValue.getKey()) {
            this.popupCalendar.bindValue(dateValue.getKey());
        } else {
            this.popupCalendar.bindValue(new Date());
        }
    }

    getTriggerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebDateEditor[1].WebDateEditorTrigger);
    }

    getInputClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebDateEditor[1].WebDateEditorInput);
    }
}
