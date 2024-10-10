import {DOM} from "../../../../Shared/Common/DOM.js";
import {RowLayout, RowLayout_Mode} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import ButtonFactory from "../../../../../ERPFrameWork/Modules/FormEngine/WebEditors/Factory/ButtonFactory.js";
import SimpleButton from "../../../../../ERPFrameWork/Modules/FormEngine/Toolbar/StandardButtons/SimpleButton.js";
import FormEngineEventFrameWork
    from "../../../../../ERPFrameWork/Modules/FormEngine/Events/FormEngineEventFrameWork.js";
import ButtonEditorEvent from "../../../WebEditor/Common/ButtonEditorEvent.js";
import {
    CoreButtonConstantButton
} from "../../../../../ERPFrameWork/Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import DropDownButton from "../../../../../ERPFrameWork/Modules/FormEngine/Toolbar/StandardButtons/DropDownButton.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";

export class ButtonHeaderAdvanced extends HTMLContainer {

    constructor() {
        super();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.StandardGridButtonHeader[0]));
        this.setElement(DOM.createElement('div'));
        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));

        let that = this;

        this.sortButtonHeader = ButtonFactory.factory(SimpleButton.clientUiKey(), new Map([
            [ButtonFactory.Attribute.classButton, this.getSortButtonHeaderClass()],
            [ButtonFactory.Attribute.imageIconSrc, './Resources/Themes/Img/Grid/Advanced/ColumnHeaderButtons/sort-alt.png'],
            [ButtonFactory.Attribute.producerDataCallback, (button) => 'Sort'],
            [ButtonFactory.Attribute.bindDataFunction, (button) => {
                button.setData(ButtonHeaderKeys.SortModel, SortMode.None);
            }],
            [ButtonFactory.Attribute.buttonKey, CoreButtonConstantButton().WebAdvancedGridSortOrder.description],
            [ButtonFactory.Attribute.clickCallback, (event, data, button) => {
                let sortMode = button.getData().get(ButtonHeaderKeys.SortModel);
                switch (sortMode) {
                    case SortMode.None:
                        sortMode = SortMode.Asc;
                        button.setImageIconSrc('./Resources/Themes/Img/Grid/Advanced/ColumnHeaderButtons/sort-ascending.png');
                        break;
                    case SortMode.Asc:
                        sortMode = SortMode.Desc;
                        button.setImageIconSrc('./Resources/Themes/Img/Grid/Advanced/ColumnHeaderButtons/sort-descending.png');
                        break;
                    case SortMode.Desc:
                        sortMode = SortMode.None;
                        button.setImageIconSrc('./Resources/Themes/Img/Grid/Advanced/ColumnHeaderButtons/sort-alt.png');
                        break;
                }
                button.setData(ButtonHeaderKeys.SortModel, sortMode);

                let buttonEvent = new ButtonEditorEvent(button, button.getButtonKey());
                buttonEvent.setValue(sortMode);
                buttonEvent.setExtraAttribute(ButtonHeaderAdvancedKeys.DataElement, that.getModelColumnConfig());

                that.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, buttonEvent);
            }]
        ]));
        this.sortButtonHeader.setData(ButtonHeaderKeys.SortModel, SortMode.None);

        this.funnellButtonHeader = ButtonFactory.factory(DropDownButton.clientUiKey(), new Map([
            [ButtonFactory.Attribute.classButton, this.getFunnelButtonHeaderClass()],
            [ButtonFactory.Attribute.imageIconSrc, './Resources/Themes/Img/Grid/Advanced/ColumnHeaderButtons/funnel-filter.png'],
            [ButtonFactory.Attribute.producerDataCallback, () => 'Funnel'],
            [ButtonFactory.Attribute.buttonKey, CoreButtonConstantButton().WebAdvancedGridFilterColumnConfig.description],
            [ButtonFactory.Attribute.clickCallback, (event, data, button) => {
                let buttonEvent = new ButtonEditorEvent(button, button.getButtonKey());
                buttonEvent.setExtraAttribute(ButtonHeaderAdvancedKeys.DataElement, that.getModelColumnConfig());
                that.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, buttonEvent);
            }]
        ]));

        this.addItem(this.sortButtonHeader, RowLayoutData.factory(24, 1, 0, 0, 0, 0));
        this.addItem(this.funnellButtonHeader, RowLayoutData.factory(24, 1, 0, 0, 0, 0));
    }

    setModelColumnConfig(dataElement) {
        this.setData(ButtonHeaderAdvancedKeys.DataElement, dataElement);
    }

    getModelColumnConfig() {
        return this.getData().get(ButtonHeaderAdvancedKeys.DataElement);
    }

    onLoad() {
        super.onLoad();
        this.setButtonHeaderClass(this.getButtonHeaderClass());
    }

    getHeight() {
        return DOM.getCompute_Height(this.element);
    }

    setButtonHeaderClass(buttonHeaderClass) {
        if (this.getAttached()) {
            this.getElement().setAttribute('class', buttonHeaderClass);
        }
    }

    getButtonHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGridButtonHeader[1].ButtonHeader);
    }

    getSortButtonHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGridButtonHeader[1].SortButtonHeader);
    }

    getFunnelButtonHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGridButtonHeader[1].FunnelButtonHeader);
    }

    getDropDownHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGridButtonHeader[1].DropDownHeaderClass);
    }
}

export let ButtonHeaderAdvancedKeys = {
    DataElement: 'DataElement',
}

export let SortMode = {
    None: 'none',
    Asc: 'asc',
    Desc: 'desc'
}

export let ButtonHeaderKeys = {
    SortModel: 'SortModel'
}