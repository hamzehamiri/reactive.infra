import {HTMLComponent} from "../../Component/HTMLComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import EditorEvent from "./EditorEvent.js";
import WebEditorValueSerializer from "./Serializer/WebEditorValueSerializer.js";
import Stack from "../../../Shared/Common/Stack.js";

export class WebEditor extends HTMLComponent {
    static StackDataValueKey() {
        return "StackDataValue";
    }

    constructor() {
        super();
        this.initStackDataValue();
        this.setVisible(true);
    }

    initStackDataValue() {
        this.setData(WebEditor.StackDataValueKey(), new Stack());
        this.setFieldChangeEvent(true);
        this.setEnable(true);
        this.setReadOnly(false)
        this.setActivePlaceHolder(true);
    }

    setPopUp(popUp) {
        this.popUp = popUp;
    }

    getPopUp() {
        return this.popUp;
    }

    setPopUpFilter(popupFilter) {
        this.popupFilter = popupFilter;
    }

    showPopUp() {
        if (this.popUp) {
            this.popUp.showAlign(this.getElement(), this.element.clientWidth);
            this.fireEvent(EventFrameWork.event.Components.Combobox.ShowPopUp);
        }
    }

    showPopUpFilter() {
        if (this.popupFilter) {
            this.popupFilter.showAlign(this.getElement(), this.element.clientWidth);
            this.fireEvent(EventFrameWork.event.Components.Combobox.ShowPopUpFilter);
        }
    }

    setWebEditorValueSerializer(webEditorValueSerializer) {
        this.setData(WebEditor.Serializer, webEditorValueSerializer);
    }

    setWebEditorValueGeneratorUI(webEditorValueGeneratorUI) {
        this.setData(WebEditor.SerializerUi, webEditorValueGeneratorUI);
    }

    setCoreWindowTabField(coreWindowTabField) {
        this.setData(WebEditor.Field, coreWindowTabField);
    }

    setCoreProcessParamDTO(coreProcessParamDTO) {
        this.setData(WebEditor.ProcessParam, coreProcessParamDTO);
    }

    setFilterMode(filterMode) {
        this.filterMode = filterMode;
    }

    setRecord(record) {
        this.setData(WebEditor.Record, record);
    }

    getCoreWindowTabField() {
        return this.getData().get(WebEditor.Field);
    }

    getCoreProcessParamDTO() {
        return this.getData().get(WebEditor.ProcessParam);
    }

    getRecord() {
        return this.getData().get(WebEditor.Record);
    }

    getWebEditorValueSerializer() {
        return this.getData().get(WebEditor.Serializer);
    }

    getWebEditorValueGeneratorUI() {
        return this.getData().get(WebEditor.SerializerUi);
    }

    getStackDataValue() {
        return this.getData().get(WebEditor.StackDataValueKey());
    }

    setGeneratedInputElement(inputElementGenerated) {
        this.inputElementGenerated = inputElementGenerated;
    }

    setOnlineTextChangeMonitor(onlineTextChangeMonitor) {
        this.onlineTextChangeMonitor = onlineTextChangeMonitor;
        if (this.getAttached()) {
            if (this.onlineTextChangeMonitor) {
                this.removeListener(EventFrameWork.event.ChangeEvent, this);
                this.requestCaptureEvent_DOM(EventFrameWork.event.ChangeEvent, this.getInputElement(), this.manageOnChangeEvent.name);
            }
        }
    }

    setOnlineTextInputMonitor(onlineTextInputMonitor, msDelay) {
        this.onlineTextInputMonitor = onlineTextInputMonitor;
        this.msDelay = msDelay;
        if (this.getAttached()) {
            if (this.onlineTextInputMonitor) {
                this.removeListener(EventFrameWork.event.onInput, this);
                this.requestCaptureEvent_DOM(EventFrameWork.event.onInput, this.getInputElement(), this.manageOnInputEvent.name);
            }
        }
    }

    setTargetDataFromOtherInputElement(targetDataFromOtherInputElement) {
        this.targetDataFromOtherInputElement = targetDataFromOtherInputElement;
    }

    setGeneratePlaceHolderLabel(placeHolderLabel) {
        this.placeHolderLabel = placeHolderLabel;
        if (this.isAttached) {
            this.getSpanLabelElement().innerText = this.placeHolderLabel;
            let elementLabel = this.getFieldSetSpanLabelElement();
            if (elementLabel) {
                elementLabel.innerText = this.placeHolderLabel;
                this.manageLabelPlaceHolder();
            }
        }
    }

    setReadOnly(readOnly) {
        this.readOnly = readOnly;
        if (this.isAttached && this.inputElementGenerated) {
            if (readOnly) {
                DOM.setReadOnlyAttribute(this.getInputElement());
            } else {
                DOM.removeReadOnlyAttribute(this.getInputElement());
            }
        }
    }

    setActivePlaceHolder(activePlaceHolder) {
        this.activePlaceHolder = activePlaceHolder;
    }

    setVisible(visible) {
        this.visible = visible;
        if (this.getAttached()) {
            if (visible) {
                DOM.removeStyleAttribute(this.getElement(), 'display');
            } else {
                DOM.addStyleAttribute(this.getElement(), 'display', 'none');
            }
        }
    }

    getVisible() {
        return this.visible;
    }

    getInputElement() {
        return this.getDataElement().get(WebEditor.InputElement);
    }

    getSpanLabelElement() {
        return this.getDataElement().get(WebEditor.SpanLabelElement);
    }

    getFieldSetSpanLabelElement() {
        return this.getDataElement().get(WebEditor.SpanLabelFieldSetSpanElement);
    }

    getInputClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorInput);
    }

    getSpanPlaceHolderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolder);
    }

    getSpanPlaceHolderFieldSetClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSet);
    }

    getSpanPlaceHolderFieldSetLegendClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegend);
    }

    getSpanPlaceHolderFieldSetLegendSpanClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegendSpan);
    }

    getSpanPlaceHolderFocusClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFocusText);
    }

    setWidthPercent(percentWidth) {
        super.setWidthPercent(percentWidth);
        if (this.inputElementGenerated) {
            DOM.setWidthPercent(this.getInputElement(), percentWidth);
        }
    }

    bindLang(languageModel, fireEvent) {
        super.bindLang(languageModel, fireEvent);
        if (this.getAttached())
            this.manageLabelPlaceHolder();
        if (this.popUp)
            this.popUp.bindLang(languageModel, fireEvent);
        if (this.popupFilter)
            this.popupFilter.bindLang(languageModel, fireEvent);
    }

    onAttach(parentElement) {
        super.onAttach(parentElement);
        if (this.inputElementGenerated) {
            this.setDataElement(WebEditor.InputElement, DOM.createElement('input'));
            this.generateInputElement(this.getInputElement());
            this.requestCaptureEvent_DOM(EventFrameWork.event.FocusEvent, this.getInputElement(), this.manageFocusInputElement.name);
            this.requestCaptureEvent_DOM(EventFrameWork.event.BlurEvent, this.getInputElement(), this.manageBlurInputElement.name);
            this.setOnlineTextChangeMonitor(this.onlineTextChangeMonitor);
            this.setOnlineTextInputMonitor(this.onlineTextInputMonitor, this.msDelay);
            DOM.addClassName(this.getInputElement(), this.getInputClass());
            // DOM.setAttribute(this.getInputElement() , 'name' , UUID.create())
        }
        if (this.placeHolderLabel && this.activePlaceHolder) {
            let spanElement = DOM.createElement('span');
            spanElement.setAttribute("data-placeholder", this.placeHolderLabel);
            spanElement.innerText = this.placeHolderLabel;
            DOM.addClassName(spanElement, this.getSpanPlaceHolderClass());

            this.setDataElement(WebEditor.SpanLabelElement, spanElement);

            this.getElement().appendChild(spanElement);

            this.setGeneratePlaceHolderLabel(this.placeHolderLabel);
        }

        this.setReadOnly(this.readOnly);

        if (this.value) {
            this.setFieldChangeEvent(false);
            this.setValue(this.value);
            this.setFieldChangeEvent(true);
        }
    }

    generateInputElement(inputElement) {
        this.getElement().appendChild(inputElement);
    }

    onDetach() {
        super.onDetach();
        if (this.inputElementGenerated) {
            if (this.getElement()) {
                try {
                    this.getInputElement().parentElement.removeChild(this.getInputElement());
                } catch (e) {
                    console.log(e);
                }
            }
        }
        if (this.placeHolderLabel != null) {
            if (this.getElement()) {
                this.getElement().removeChild(this.getSpanLabelElement());
            }
        }
    }

    manageLabelPlaceHolder() {
        if (this.getSpanLabelElement()) {
            if (this.isEmptyVariable()) {
                if (this.getSpanPlaceHolderFocusClass())
                    DOM.removeClassName(this.getSpanLabelElement(), this.getSpanPlaceHolderFocusClass());
                this.manageLabelPlaceHolderEmptyPositionWithLang();
            } else {
                if (this.getSpanPlaceHolderFocusClass())
                    DOM.addClassName(this.getSpanLabelElement(), this.getSpanPlaceHolderFocusClass(), false);
                this.manageLabelPlaceHolderValuePositionWithLang();
            }
        }
    }

    manageLabelPlaceHolderEmptyPositionWithLang() {

    }

    manageLabelPlaceHolderValuePositionWithLang() {

    }

    manageFocusInputElement() {
        if (this.getSpanLabelElement() && !this.isEmptyVariable()) {
            DOM.addClassName(this.getSpanLabelElement(), this.getSpanPlaceHolderFocusClass(), false);
        }
    }

    manageBlurInputElement() {
        if (this.getSpanLabelElement() && this.isEmptyVariable()) {
            DOM.removeClassName(this.getSpanLabelElement(), this.getSpanPlaceHolderFocusClass());
        }
    }

    isEmptyVariable() {
        return (this.inputElementGenerated && this.getInputElement().value === '') || (!this.inputElementGenerated && this.value === null);
    }

    manageOnInputEvent(inputEvent) {
        if (inputEvent instanceof InputEvent) {
            if (this.instanceTimeOutInputEvenet) {
                clearTimeout(this.instanceTimeOutInputEvenet);
            }
            this.instanceTimeOutInputEvenet = setTimeout(() => {
                this.convertAndSetValue(inputEvent.target.value);
            }, this.msDelay);
        }
    }

    manageOnChangeEvent(event) {
        if (event instanceof Event) {
            this.convertAndSetValue(event.target.value);
        }
    }

    convertAndSetValue(rawValue) {
        if (this.getWebEditorValueSerializer()) {
            let valueModel = this.getWebEditorValueSerializer().convertRawToModel(rawValue);
            this.setValue(valueModel);
        } else {
            this.setValue(rawValue);
        }
    }

    popFromStackDataValue() {
        let popValue = this.getStackDataValue().pop();
        this.setValue(popValue);
    }

    setFieldChangeEvent(enableChangeEvent) {
        this.enableChangeEvent = enableChangeEvent;
    }

    setValue(value) {
        this.value = value;
        if (!this.readOnly && this.enable) {
            if (this.getAttached()) {
                this.getStackDataValue().push(value);
                if (this.getWebEditorValueGeneratorUI() != null)
                    this.getWebEditorValueGeneratorUI().generateUi(value);
                if (this.inputElementGenerated) {
                    if (this.getWebEditorValueSerializer()) {
                        this.getInputElement().value = this.getWebEditorValueSerializer().serializeModelToDisplay(this.value, this.getCoreWindowTabField());
                    } else {
                        this.getInputElement().value = value;
                    }
                }
                if (this.enableChangeEvent)
                    this.fireEvent(EventFrameWork.event.Editors.FieldChangeEvent, new EditorEvent(this));
                this.manageLabelPlaceHolder();
            }
        }
    }

    getValue() {
        if (this.readOnly)
            return this.value;
        if (this.inputElementGenerated && !this.targetDataFromOtherInputElement) {
            if (this.getWebEditorValueSerializer()) {
                return this.getWebEditorValueSerializer().convertRawToModel(this.getInputElement().value);
            } else {
                return this.getInputElement().value;
            }
        } else {
            if (this.getWebEditorValueSerializer() && this.getWebEditorValueSerializer() instanceof WebEditorValueSerializer) {
                return this.getWebEditorValueSerializer().convertRawToModel(this.value);
            } else {
                return this.value;
            }
        }
    }

    getOriginalValue() {
        return this.value;
    }

    getEventBindElement() {
        return this.getInputElement();
    }

    containOf(element) {
        return this.getElement().contains(element);
    }
}

WebEditor.InputElement = "InputElement";
WebEditor.SpanLabelElement = "SpanLabelElement";
WebEditor.SpanLabelFieldSetSpanElement = "SpanLabelFieldSetSpanElement";
WebEditor.Field = "field";
WebEditor.ProcessParam = "ProcessParam";
WebEditor.Record = "record";
WebEditor.Serializer = "serializer";
WebEditor.SerializerUi = "serializerUi";
export const WebEditorDataElement = {
    FilterTrigger: 'FilterTrigger',
    RemoveTrigger: 'RemoveTrigger'
}
