import {WebEditor} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import WebCheckBoxValueGeneratorUI from "./Containers/CheckBox/WebCheckBoxValueGeneratorUI.js";
import DataProviderAbstract from "../../../Communicate/Common/DataProvider/DataProviderAbstract.js";

export class WebCheckBoxEditor extends WebEditor {

    static registerKey() {
        return "WebCheckBoxEditor"
    };

    static StateModeKey() {
        return "StateModeCheckBox"
    };

    constructor(stateMode) {
        super();

        this.icon = DOM.createElement("img");
        this.icon.setAttribute("src", "Resources/Themes/IMG/CheckBox/unchecked.svg");
        this.label = DOM.createElement("p");

        this.masterDiv = DOM.createElement("div");
        this.masterDiv.appendChild(this.icon);
        this.masterDiv.appendChild(this.label);

        this.setElement(this.masterDiv);
        this.setStateMode(stateMode === undefined || stateMode === null ? WebCheckBoxEditor.StateMode.Mode2State : stateMode);
        this.setGeneratedInputElement(false);
        this.setWebEditorValueGeneratorUI(new WebCheckBoxValueGeneratorUI(this));
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebCheckBoxEditor[0]));

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.icon, this.onMouseClick.name, this);
        this.setValue(null);
    }

    getStateMode() {
        return this.getData().get(WebCheckBoxEditor.StateModeKey());
    }

    setStateMode(stateMode) {
        this.setData(WebCheckBoxEditor.StateModeKey(), stateMode);
    }

    onMouseClick(event) {
        let value = this.getValue();
        if (value instanceof DataProviderAbstract) {
            let keyValue = value.getKey();
            this.convertData(keyValue);
        } else if (value && value.constructor === String) {
            this.convertData(value);
        } else {
            this.convertData(value);
        }
    }

    convertData(keyValue) {
        switch (this.getStateMode()) {
            case WebCheckBoxEditor.StateMode.Mode2State:
                if (keyValue === "false" || keyValue === null)
                    this.setValue("true");
                else if (keyValue === "true") {
                    this.setValue("false");
                }
                break;
            case WebCheckBoxEditor.StateMode.Mode3State:
                if (keyValue === null)
                    this.setValue("true");
                else if (keyValue === "true") {
                    this.setValue("false");
                } else if (keyValue === 'false') {
                    this.setValue(null);
                }
                break;
        }
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.icon, this.getCheckBoxClass());
        DOM.addClassName(this.label, this.getSpanPlaceHolderClass());

        DOM.setWidth(this.icon, 30);
        DOM.setHeightPercent(this.icon, "100");

        this.setGeneratePlaceHolderLabel(this.labelField);
    }

    setGeneratePlaceHolderLabel(labelField) {
        this.labelField = labelField;
        if (this.isAttached) {
            this.label.innerHTML = labelField;
        }
    }

    getCheckBoxClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebCheckBoxEditor[1].CheckBox);
    }

    getSpanPlaceHolderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebCheckBoxEditor[1].SpanPlaceHolder);
    }
}

WebCheckBoxEditor.StateMode = {
    Mode3State: 'State3',
    Mode2State: 'State2'
}