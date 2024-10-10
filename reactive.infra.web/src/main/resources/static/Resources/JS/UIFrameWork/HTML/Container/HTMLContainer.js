import {ShareContainer} from "../../Shared/Layout/ShareContainer.js";
import {HTMLComponent} from "../Component/HTMLComponent.js";
import {ShareLayout} from "../../Shared/Layout/ShareLayout.js";
import {ItemValidationType, LimitItemValidation} from "./Layout/Sizeable/Normal/LimitItemValidation.js";
import {UUID} from "../../Shared/Common/UUID.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import BaseEvent from "../../Shared/Event/BaseEvent.js";

export default class HTMLContainer extends HTMLComponent {
    constructor() {
        super();
        // Reflection.extendsCLass(this, ShareContainer);
        // this.initialVariables();
    }

    initialVariables() {
        super.initialVariables();
        this.setData(ShareContainer.Items, new Map());
        this.setData(ShareContainer.ElementItem, new Map());
    }

    getItems() {
        return this.getData().get(ShareContainer.Items);
    }

    getLayout() {
        return this.getData().get(ShareContainer.Layout);
    }

    getElementItem() {
        return this.getData().get(ShareContainer.ElementItem);
    }

    setLayout(layout) {
        if (this.getLayout()) {
            // ClientLogger.Log(LogLevel.Debug, "BeforeAdded");
            this.getLayout().setContainer(null);
        }
        this.setData(ShareContainer.Layout, layout)
        if (layout) {
            layout.setContainer(this);
        }
        this.validLayoutAndItems();
    }

    setFixSize(fixSize) {
        this.fixSize = fixSize;
    }

    getFixSize() {
        return this.fixSize;
    }

    setSize(width, height) {
        super.setSize(width, height);
        if (this.getAttached()) {
            this.layoutExecute();
        }
    }

    setHeight(height) {
        super.setHeight(height);
        if (this.getAttached()) {
            this.layoutExecute();
        }
    }

    layoutExecute() {
        if (this.getLayout()) {
            let that = this;
            if (this.getLayout().getLayoutPerItem()) {
                this.getItems().forEach(function (item) {
                    that.getLayout().LayoutProcessPerItem(item);
                });
            } else {
                this.getLayout().LayoutProcess();
            }
        }
    }

    bindLang(languageModel, fireEvent) {
        super.bindLang(languageModel, fireEvent);
        if (this.getAttached()) {
            this.getItems().forEach((item, uuid) => {
                if (item instanceof HTMLComponent) {
                    item.bindLang(languageModel, fireEvent);
                }
            });
            this.layoutExecute();
        }
    }

    setParentNoSize(parentNoSize) {
        this.parentNoSize = parentNoSize;
    }

    getParentNoSize() {
        return this.parentNoSize;
    }

    cleanStyleItems() {
        this.getItems().forEach((item) => {
            item.removeAttribute("style");
            if (item instanceof ShareContainer || item instanceof HTMLContainer) {
                item.cleanStyleItems();
            }
        });
    }

    restyle() {
        super.restyle();
        this.layoutExecute();
    }

    onLoad() {
        super.onLoad();
        let items = this.getItems();
        if (items) {
            let that = this;
            items.forEach(function (item) {
                that.getLayout().PassiveLayout(item);
            });
        }
    }

    callBackTransition() {
        // super.callBackTransition();
        if (this.getLayout()) {
            this.getLayout().LayoutProcess();
        }
    }

    onDetach() {
        super.onDetach();
        if (this.getLayout()) {
            this.getLayout().onDetach();
        }
    }

    validLayoutAndItems() {
        let layout = this.getLayout();
        if (layout instanceof ShareLayout) {
            if (layout.getLimitItemValidation() instanceof LimitItemValidation) {
                let type = layout.getLimitItemValidation().getItemValidationType();
                let count = layout.getLimitItemValidation().getItemCounts();
                if (type === ItemValidationType.Limited && this.getItems().length > count) {
                    // ClientLogger.Log(LogLevel.Debug, "ShareLayout Failed");
                }
            }
        }
    }

    addItem(component, layoutData, runtimeExecuteLayout) {
        if (layoutData) {
            if (component instanceof HTMLComponent) {
                component.setData(ShareContainer.LayoutData, layoutData);
            } else if (component instanceof Element) {
                this.getElementItem().set(component, layoutData);
            }
        }
        if (component instanceof HTMLComponent) {
            this.getItems().set(component.getUUID(), component);
        } else if (component instanceof Element) {
            this.getItems().set(UUID.create(), component);
        }
        this.validLayoutAndItems();
        this.getLayout().ActivePreProcessLayout(component, false);

        if (this.getAttached() && runtimeExecuteLayout === undefined || (this.getAttached() && runtimeExecuteLayout !== undefined && runtimeExecuteLayout === true)) {
            this.layoutExecute();
        }

        this.fireEvent(EventFrameWork.event.Components.Container.ContainerAddItem, new BaseEvent(component));
    }

    addItemData(data, layoutData) {
        this.getLayout().addItemData(data, layoutData);
    }

    clearItems() {
        let items = this.getItems();
        if (items) {
            items.forEach((item) => {
                if (item.getAttached()) {
                    item.onDetach();
                }
            });
            items.clear();
        }
    }

    removeItem(component) {
        let items = this.getItems();
        if (items) {
            if (component instanceof HTMLComponent) {
                if (this.getAttached()) {
                    component.onDetach();
                }
                items.delete(component.getUUID());

                this.getLayout().ActivePreProcessLayout(component, true);
                this.layoutExecute();
            } else if (component instanceof Element) {
                let layout = this.getLayout();
                items.forEach((item, uuid) => {
                    if (item === component) {
                        items.delete(uuid);
                        item.remove();
                        layout.ActivePreProcessLayout(item, true);
                    }
                });
                this.layoutExecute();
            }
        }
    }

    containElement(event) {
        for (let item of this.getItems().values()) {
            if (item instanceof HTMLComponent) {
                if (item.containElement(event))
                    return true;
            }
        }
        return this.getElement() != null ? this.getElement().contains(event.target) : false;
    }

    isComponentInPoint(event, functionIsPointInPath) {

    }
}