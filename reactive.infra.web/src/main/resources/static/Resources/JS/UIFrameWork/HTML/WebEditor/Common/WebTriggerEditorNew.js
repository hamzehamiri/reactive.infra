import {WebEditor} from "./WebEditor.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import {RowLayoutData} from "../../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {RowLayout, RowLayout_Mode} from "../../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import HTMLContainer from "../../Container/HTMLContainer.js";

export default class WebTriggerEditorNew extends WebEditor {

    constructor() {
        super();

        this.masterDiv = DOM.createElement("div");

        this.setElement(this.masterDiv);
        this.setGeneratedInputElement(false);
        this.bindTheme();

        this.triggerEditorContainer = new HTMLContainer();
        this.triggerEditorContainer.setElement(DOM.createElement("fieldset"));
        this.triggerEditorContainer.addAttributeElement('class', this.getWebTriggerEditorContainerOfTriggerClass() + " " + this.getSpanPlaceHolderFieldSetClass());
        this.triggerEditorContainer.addAttributeElement("container_of_trigger", "true");
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebTriggerEditor[0]));
    }

    setLanguage(languageModel) {
        super.setLanguage(languageModel);
        if (this.triggerEditorContainer) {
            if (languageModel && languageModel.getIsRTL()) {
                this.triggerEditorContainer.addStyleAttribute("text-align", 'right');
            } else {
                this.triggerEditorContainer.addStyleAttribute("text-align", 'left');
            }
        }
    }

    generateBaseTriggerEditor() {
        this.triggerEditorContainer.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        this.triggerElement = DOM.createElement("div");

        let fieldSetLegendSpanElement = DOM.createElement('span');
        fieldSetLegendSpanElement.innerText = this.placeHolderLabel;
        DOM.addClassName(fieldSetLegendSpanElement, this.getSpanPlaceHolderFieldSetLegendSpanClass());

        let fieldSetLegendElement = DOM.createElement('legend');
        fieldSetLegendElement.appendChild(fieldSetLegendSpanElement);
        DOM.addClassName(fieldSetLegendElement, this.getSpanPlaceHolderFieldSetLegendClass());

        this.setDataElement(WebEditor.SpanLabelFieldSetSpanElement, fieldSetLegendSpanElement);

        this.containerOfItems = new HTMLContainer();
        this.containerOfItems.setLayout(new RowLayout(RowLayout_Mode.Horizontal));
        this.containerOfItems.setElement(DOM.createElement("div"));
        this.containerOfItems.addAttributeElement("for_other_element", "true");

        this.addElement(fieldSetLegendElement, RowLayoutData.factory(0, 0, 0, 0, 0, 0, true, true));
        this.addElement(this.triggerElement, RowLayoutData.factory(32, 1, 0, 0, 0, 0, true));
        this.addElement(this.containerOfItems, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.triggerElement, this.onMouseClickTrigger.name, this);
    }

    containElement(event) {
        return super.containElement(event) || this.containerOfItems.containElement(event);
    }

    generateInputElement(inputElement) {
        this.containerOfItems.addItem(inputElement, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
    }

    onMouseClickTrigger(event) {
        this.showPopUp();
    }

    bindLang(languageModel, fireEvent) {
        super.bindLang(languageModel, fireEvent);
        this.containerOfItems.bindLang(languageModel, fireEvent);
    }

    manageLabelPlaceHolderEmptyPositionWithLang() {
        if (this.languageModel && this.languageModel.getIsRTL()) {

        } else {

        }
    }

    manageLabelPlaceHolderValuePositionWithLang() {
        if (this.languageModel && this.languageModel.getIsRTL()) {
            DOM.addStyleAttribute(this.getSpanLabelElement(), 'transform', 'scale(0.8) translateY(-20px) translateX(40px)');
        } else {
            DOM.addStyleAttribute(this.getSpanLabelElement(), 'transform', 'scale(0.8) translateY(-20px) translateX(-26px)');
        }
    }

    onLoad() {
        super.onLoad();

        this.triggerEditorContainer.setParent(this);
        this.triggerEditorContainer.onAttach(this.getElement());
        this.triggerEditorContainer.bindLang(this.languageModel);

        DOM.addClassName(this.triggerElement, this.getTriggerClass());
        DOM.setAttribute(this.triggerElement, "trigger", "true");

        // DOM.addClassName(this.triggerElementRemove, this.getTriggerRemoveClass());
    }

    setSize(width, height) {
        super.setSize(width, height);
        this.triggerEditorContainer.setSize(width, height);
    }

    addElement(componentOrElement, layoutData) {
        this.triggerEditorContainer.addItem(componentOrElement, layoutData);
    }

    removeTrigger(componentOrElement) {
        this.triggerEditorContainer.removeItem(componentOrElement);
    }

    getInputClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].InputTriggerField);
    }

    getSpanPlaceHolderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].SpanPlaceHolderTrigger);
    }

    getSpanPlaceHolderFieldSetClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSet);
    }

    getSpanPlaceHolderFieldSetLegendClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSetLegend);
    }

    getSpanPlaceHolderFieldSetLegendSpanClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSetLegendSpan);
    }

    getWebTriggerEditorContainerOfTriggerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorContainerOfTrigger);
    }

    getSpanPlaceHolderFocusClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].SpanPlaceHolderFocusTrigger);
    }

    getTriggerRemoveClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorRemove);
    }

    getTriggerFilterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorFilter);
    }
}