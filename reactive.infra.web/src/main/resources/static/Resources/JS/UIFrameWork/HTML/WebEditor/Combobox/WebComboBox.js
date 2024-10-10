import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import {ComboBoxPopup} from "./Container/ComboBoxPopup.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import {ListView} from "../../ListView/ListView.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import ListViewEvent from "../../ListView/ListViewEvent.js";
import {FitLayout} from "../../Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import WebTriggerEditorNew from "../Common/WebTriggerEditorNew.js";
import PageDataDTO from "../../../../ERPFrameWork/Communicate/Models/Request/Common/PageDataDTO.js";
import RecordDescriptors from "../../../../ERPFrameWork/Modules/FormEngine/Commands/RecordDescriptors.js";
import {Util} from "../../../Shared/Common/Util.js";

export class WebComboBox extends WebTriggerEditorNew {
    static registerKey() {
        return "WebComboBox"
    };

    static SelectionMode() {
        return "SelectionMode"
    }

    constructor(selectionMode) {
        super();
        this.selectionMode = selectionMode;

        this.createListView();

        this.popUp = new ComboBoxPopup();
        this.popUp.setLayout(new FitLayout());
        this.popUp.addItem(this.listView);

        this.popUpFilter = new ComboBoxPopup();
        this.popUpFilter.setLayout(new FitLayout());

        this.bindListenerListView();
        this.setData(WebComboBox.SelectionMode(), selectionMode);
        this.setTargetDataFromOtherInputElement(true);
        this.setGeneratedInputElement(false);
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebComboBoxEditor[0]));

        this.setPopUp(this.popUp);
        this.setPopUpFilter(this.popUpFilter);

        this.generateBaseTriggerEditor();
    }

    createListView() {
        this.listView = new ListView();
    }

    containElement(event) {
        return super.containElement(event) || this.popUp.containElement(event);
    }

    bindListenerListView() {
        let that = this;
        this.listView.addListener(EventFrameWork.event.Components.ListView.SelectItem, (listViewEvent) => {
            if (listViewEvent instanceof ListViewEvent) {
                let editorValue;
                let val = listViewEvent.getSelectedItems();
                switch (this.selectionMode) {
                    case WebComboBox.SelectionModeData.SelectedModeSingle:
                        if (val instanceof Array) {
                            let valFinal = Util.convertTemplateLayoutData(val[0]);
                            if (valFinal instanceof PageDataDTO) {
                                editorValue = valFinal.getRecordModelDTO().getFieldValues().values().next().value;
                                editorValue = RecordDescriptors.WebEditorValueConvert(editorValue);
                            }
                        }
                        break;
                    case WebComboBox.SelectionModeData.SelectedModeMulti:
                        editorValue = [];
                        if (val instanceof Array) {
                            val.forEach((valueTemplateLayoutData) => {
                                let valFinal = Util.convertTemplateLayoutData(valueTemplateLayoutData);
                                if (valFinal instanceof PageDataDTO) {
                                    valFinal = valFinal.getRecordModelDTO().getFieldValues().values().next().value;
                                    valFinal = RecordDescriptors.WebEditorValueConvert(valFinal);
                                    editorValue.push(valFinal);
                                }
                            });
                        }
                        break;
                }
                that.setValue(editorValue);
                that.popUp.hide();
            }
        }, this);
    }

    getTriggerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorTrigger);
    }

    getItemTagPClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorItemTagP);
    }

    containOf(element) {
        return super.containOf(element) || (this.popUp.getElement() != null && this.popUp.getElement().contains(element));
    }
}

WebComboBox.SelectionModeData = {
    SelectedModeSingle: 'Single',
    SelectedModeMulti: 'Multi'
}
