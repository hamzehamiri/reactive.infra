import {WebEditor} from "../Common/WebEditor.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import ButtonFactory from "../../../../ERPFrameWork/Modules/FormEngine/WebEditors/Factory/ButtonFactory.js";
import BaseEvent from "../../../Shared/Event/BaseEvent.js";
import ButtonEditorEvent from "../Common/ButtonEditorEvent.js";
import {Util} from "../../../Shared/Common/Util.js";

export class BaseButtonEditor extends WebEditor {

    static Init() {
        ButtonFactory.register(BaseButtonEditor.clientUiKey(), BaseButtonEditor);
    }

    static clientUiKey() {
        return "BaseButtonEditor";
    };

    constructor(attributeMap, txtButton, defaultButton) {
        super();

        this.setData(BaseButtonEditor.Keys.AttributeMap, attributeMap);
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Buttons[0]));

        this.defaultButton = defaultButton;
        if (defaultButton) {
            this.initDefault(txtButton);
            this.setAttributeMap(attributeMap, txtButton);
        }
    }

    setAttributeMap(attributeMap) {
        if (attributeMap) {
            this.clickCallback = attributeMap.get(ButtonFactory.Attribute.clickCallback);
            this.producerDataCallback = attributeMap.get(ButtonFactory.Attribute.producerDataCallback);
            this.imageIcon = attributeMap.get(ButtonFactory.Attribute.imageIconSrc);
            this.classButton = attributeMap.get(ButtonFactory.Attribute.classButton) ? attributeMap.get(ButtonFactory.Attribute.classButton) : "";
            this.bindDataFunction = attributeMap.get(ButtonFactory.Attribute.bindDataFunction);
            this.jsonTheme = attributeMap.get(ButtonFactory.Attribute.jsonTheme);
            if (this.jsonTheme) {
                const classNames = Util.keyAllKeysJson(this.jsonTheme);
                classNames.forEach((className) => {
                    this.addClassByElementNameDynamic(className, this.jsonTheme);
                });
            }
            this.setButtonKey(attributeMap.get(ButtonFactory.Attribute.buttonKey));

            this.setImageIconSrc(this.imageIcon);
        }
    }

    setButtonKey(modelKey) {
        this.setData(BaseButtonEditor.Keys.ButtonKey, modelKey);
    }

    getButtonKey() {
        return this.getData().get(BaseButtonEditor.Keys.ButtonKey);
    }

    getAttributeMap() {
        return this.getData().get(BaseButtonEditor.Keys.AttributeMap);
    }

    initDefault(txtButton) {
        this.imgElement = DOM.createElement('img');
        DOM.setWidthPercent(this.imgElement, '100');
        DOM.setHeightPercent(this.imgElement, '100');

        this.masterElement = DOM.createElement('div');
        this.masterElement.appendChild(this.imgElement);

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.masterElement, this.onMouseClick.name, this)
        this.setElement(this.masterElement);

        if (txtButton) {
            this.setData(BaseButtonEditor.Keys.TextButton, txtButton);
            this.getElement().innerHTML = txtButton;
        }
    }

    addBaseButtonClass(classButton) {
        if (this.getAttached()) {
            let classList = classButton.split(" ");
            classList.forEach(value => {
                DOM.addClassName(this.getElement(), value);
            });
        }
    }

    setImageIconSrc(imageIcon) {
        this.imageIcon = imageIcon;
        if (this.getAttached()) {
            if (this.defaultButton) {
                DOM.setAttribute(this.imgElement, 'src', imageIcon);
            }
        }
    }

    onLoad() {
        super.onLoad();
        if (this.defaultButton) {
            if (this.imageIcon)
                this.setImageIconSrc(this.imageIcon);
            if (this.classButton)
                this.addBaseButtonClass(this.classButton);
        }
    }

    setActiveClass(activeClass) {
        if (this.getAttached()) {
            DOM.addClassName(this.getElement(), activeClass);
        }
    }

    setDeActiveClass(activeClass) {
        if (this.getAttached()) {
            DOM.removeClassName(this.getElement(), activeClass);
        }
    }

    onMouseClick(event) {
        if (this.clickCallback) {
            this.clickCallback(new ButtonEditorEvent(this, this.getButtonKey()), null, this);
        }
        this.fireEvent(EventFrameWork.event.MouseEvent.click, new BaseEvent(this));
    }

    setSize(width, height) {
        super.setSize(width, height);
        this.setWidth(width);
    }

    setWidth(width) {
        super.setWidth(width);
        if (this.getInputElement()) {
            this.getInputElement().style['width'] = width + "px";
        }
    }

    getButtonGeneralClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Buttons[1].btn_general);
    }
}

BaseButtonEditor.Keys = {
    ButtonKey: 'btn_key',
    AttributeMap: 'AttributeMap',
    TextButton: 'TextButton'
}