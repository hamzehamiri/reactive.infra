import {BaseButtonEditor} from "../../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {ListView} from "../../../../../../UIFrameWork/HTML/ListView/ListView.js";
import {TemplateLayout} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import {EventFrameWork} from "../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import BaseEvent from "../../../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import ComponentWithBaseEvent from "../../../../../../UIFrameWork/HTML/Component/ComponentWithBaseEvent.js";
import {ShareLayout} from "../../../../../../UIFrameWork/Shared/Layout/ShareLayout.js";
import {Util} from "../../../../../../UIFrameWork/Shared/Common/Util.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import ListViewEvent from "../../../../../../UIFrameWork/HTML/ListView/ListViewEvent.js";
import ButtonEditorEvent from "../../../../../../UIFrameWork/HTML/WebEditor/Common/ButtonEditorEvent.js";
import FormEngineEventFrameWork from "../../../Events/FormEngineEventFrameWork.js";
import {ComboBoxPopup} from "../../../../../../UIFrameWork/HTML/WebEditor/Combobox/Container/ComboBoxPopup.js";
import {FitLayout} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";

export default class BaseDropDownButton extends BaseButtonEditor {
    constructor(CommandCustomConsumer, attributeMap, txtButton, defaultButton) {
        super(attributeMap, txtButton, !defaultButton ? true : defaultButton);

        this.iconArrowSize = 20;
        this.widthPopUp = 200;
        this.CommandCustomConsumer = CommandCustomConsumer;

        this.listView = new ListView();
        this.listView.setLayout(new TemplateLayout('li'));
        this.listView.addListener(EventFrameWork.event.Components.Container.ContainerAddItem, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let component = baseEvent.getSource();
                if (component instanceof ComponentWithBaseEvent) {
                    let itemData = component.getData().get(ShareLayout.ItemData);
                    let pTagElement = Util.findElementWithStartElement(component.getElement(), this.WaterMarkInstance().toLowerCase());
                    let itemDataDisplayTag = itemData[1].Data.Display;
                    let width = Util.getWithOfText(itemDataDisplayTag, DOM.getFontFamily(pTagElement), DOM.getFontSize(pTagElement));
                    this.widthPopUp = Math.max(width, this.widthPopUp);
                    this.popUp.setWidth(this.widthPopUp);
                }
            }
        });
        this.listView.addListener(EventFrameWork.event.Components.ListView.SelectItem, (listViewEvent) => {
            if (listViewEvent instanceof ListViewEvent) {
                let valueTemplateLayoutData = listViewEvent.getSelectedItems();
                if (valueTemplateLayoutData != null && valueTemplateLayoutData instanceof Array) {
                    let buttonEvent = new ButtonEditorEvent(this, this.getButtonKey());
                    buttonEvent.setValue(Util.convertTemplateLayoutData(valueTemplateLayoutData[0]));
                    this.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, buttonEvent);
                }
            }
        });

        this.popUp = new ComboBoxPopup();
        this.popUp.setLayout(new FitLayout());
        this.popUp.addItem(this.listView);

        this.setPopUp(this.popUp);
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.BaseDropDownButton[0]));
    }

    WaterMarkInstance() {
        return "Base";
    }

    clientUiKeyInstance(){
        return "BaseKey";
    }

    initDefault(txtButton) {
        super.initDefault(txtButton);

        this.imgElement = DOM.createElement('img');
        this.arrowElement = DOM.createElement("div");

        this.masterElement = DOM.createElement('div');
        this.masterElement.appendChild(this.imgElement);
        this.masterElement.appendChild(this.arrowElement);

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.masterElement, this.onMouseClick.name, this)
        this.setElement(this.masterElement);

        if (txtButton) {
            this.setData(BaseButtonEditor.Keys.TextButton, txtButton);
            this.getElement().innerHTML = txtButton;
        }

        this.setRequestWidth(60);
    }

    onMouseClick(event) {
        super.onMouseClick(event);
        if (this.arrowElement.contains(event.target)) {

            this.popUp.showAlign(this.getElement(), this.widthPopUp);
            this.fireEvent(EventFrameWork.event.Components.Combobox.ShowPopUp);

            this.CommandCustomConsumer(this.clientUiKeyInstance(), this, new ButtonEditorEvent(this, this.clientUiKeyInstance()));
        } else if (this.imgElement.contains(event.target)) {
            this.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, new ButtonEditorEvent(this, this.getButtonKey()));
        }
    }

    setSize(width, height) {
        super.setSize(width, height);

        DOM.setWidth(this.arrowElement, this.iconArrowSize);
        DOM.setWidth(this.imgElement, width - this.iconArrowSize);
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.getElement(), this.getButtonGeneralClass());
        DOM.addClassName(this.getElement(), this.getBaseDropDownButtonMasterClass());
        DOM.addClassName(this.imgElement, this.getBaseDropDownButtonIconClass());
        DOM.addClassName(this.arrowElement, this.getBaseDropDownButtonArrowClass());
    }

    getBaseDropDownButtonMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.BaseDropDownButton[1].BaseDropDownButton_Master);
    }

    getBaseDropDownButtonIconClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.BaseDropDownButton[1].BaseDropDownButton_Icon);
    }

    getBaseDropDownButtonArrowClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.BaseDropDownButton[1].BaseDropDownButton_Arrow);
    }

    getBaseDropDownButtonPopUpItemPTagClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.BaseDropDownButton[1].BaseDropDownButton_PopUpItemPTag);
    }
}