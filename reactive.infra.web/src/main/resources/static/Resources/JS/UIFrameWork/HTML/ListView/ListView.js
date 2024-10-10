import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {DOM} from "../../Shared/Common/DOM.js";
import {HTMLComponent} from "../Component/HTMLComponent.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {ShareLayout} from "../../Shared/Layout/ShareLayout.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import ListViewEvent from "./ListViewEvent.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export class ListView extends HTMLContainer {
    constructor() {
        super();
        this.setElement(DOM.createElement("ul"));

        this.bindEvents();
        this.bindTheme();
    }

    bindEvents() {
        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousedown, this.getElement(), this.onMouseDown.name, this);
        // this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousemove, this.getElement(), this.onMouseMove.name, this);
        // this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseout, this.getElement(), this.onMouseOut.name, this);
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.ListView[0]));
    }

    setSelectedData(selectedData) {
        this.selectedData = selectedData;
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.getElement(), this.getContainerClass());
    }

    getContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.ListView[1].Container);
    }

    getItemClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.ListView[1].Item);
    }

    getItemHover() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.ListView[1].ItemHover);
    }

    getItemSelected() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.ListView[1].ItemSelected);
    }

    addItem(component, layoutData) {
        super.addItem(component, layoutData);
        if (component instanceof HTMLComponent && component.getElement()) {
            DOM.addClassName(component.getElement(), this.getItemClass());
        }
    }

    // onMouseMove(event) {
    //     let item = this.findItem(event, this.getItems());
    //     this.removeStyle(this.getItemHover());
    //     if (item) {
    //         if (item instanceof HTMLComponent && item.getElement()) {
    //             DOM.addClassName(item.getElement(), this.getItemHover());
    //         }
    //     }
    // }

    onMouseDown(event) {
        if (!this.selectedModelData) {
            this.selectedModelData = [];
            this.selectedUiItem = [];
        }
        if (!event.ctrlKey) {
            this.selectedModelData = [];
            this.selectedUiItem = [];
            this.removeStyle(this.getItemSelected());
        }

        let item = this.findItem(event, this.getItems());
        if (item) {
            let findOld = this.selectedUiItem.find(function (itemUi) {
                return itemUi.getElement().contains(event.target);
            });
            if (!findOld) {
                this.selectedModelData.push(item.getData().get(ShareLayout.ItemData));
                this.selectedUiItem.push(item);
                if (item instanceof HTMLComponent && item.getElement()) {
                    DOM.addClassName(item.getElement(), this.getItemSelected());
                }
            }
            this.fireEvent(EventFrameWork.event.Components.ListView.SelectItem, new ListViewEvent(this));
        }
    }

    // onMouseOut(event) {
    //     this.removeStyle(this.getItemHover());
    // }

    findItem(event, items) {
        for (let item of items) {
            if (item[1].getElement().contains(event.target)) {
                return item[1];
            }
        }
    }

    removeStyle(className) {
        for (let item of this.getItems()) {
            DOM.removeClassName(item[1].getElement(), className);
        }
    }

    getSelectedItems() {
        return this.selectedModelData;
    }
}
