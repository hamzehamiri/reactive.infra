import {ShareContainer} from "./ShareContainer.js";
import {LimitItemValidation} from "../../HTML/Container/Layout/Sizeable/Normal/LimitItemValidation.js";
import {BaseObservable} from "../Event/BaseObservable.js";
import BaseSharedComponent from "../BaseShared/BaseSharedComponent.js";
import {HTMLComponent} from "../../HTML/Component/HTMLComponent.js";
import {DOM} from "../Common/DOM.js";

export class ShareLayout extends BaseObservable {
    constructor(layoutPerItem, isRTLProviderFunction) {
        super();
        this.isRTLProviderFunction = isRTLProviderFunction ? isRTLProviderFunction : (component) => {
            return this.container.getLanguage().getIsRTL();
        };
        this.setLayoutPerItem(layoutPerItem);
    }

    applyData(json) {
        Object.assign(this, json);
    }

    setMargin(marginTop, marginRight, marginBottom, marginLeft) {
        this.marginTop = marginTop;
        this.marginRight = marginRight;
        this.marginBottom = marginBottom;
        this.marginLeft = marginLeft;
    }

    computeMargin() {
        let incWidth = 0;
        let incHeight = 0;
        if (this.marginRight) {
            incWidth += this.marginRight;
            DOM.addStyleAttribute(this.getContainer().getElement(), 'margin-right', this.marginRight + "px");
        }
        if (this.marginLeft) {
            incWidth += this.marginLeft;
            DOM.addStyleAttribute(this.getContainer().getElement(), 'margin-left', this.marginLeft + "px");
        }

        if (this.marginTop) {
            incHeight += this.marginTop;
            DOM.addStyleAttribute(this.getContainer().getElement(), 'margin-top', this.marginTop + "px");
        }
        if (this.marginBottom) {
            incHeight += this.marginBottom;
            DOM.addStyleAttribute(this.getContainer().getElement(), 'margin-bottom', this.marginBottom + "px");
        }

        return {
            incWidth: incWidth,
            incHeight: incHeight
        }
    }

    setLimitItemValidation(limitItemValidation) {
        this.limitItemValidation = limitItemValidation;
        if (limitItemValidation instanceof LimitItemValidation) {

        }
    }

    onDetach() {
        this.container.getItems().forEach((component) => {
            if (component instanceof HTMLComponent && component.getAttached()) {
                component.onDetach();
            } else if (component instanceof Element) {
                component.remove();
            }
        })
    }

    getLimitItemValidation() {
        return this.limitItemValidation;
    }

    PassiveLayout(component) {

    }

    ActivePreProcessLayout(component, remove) {

    }

    addItemData(data, layoutData) {

    }

    setContainer(container) {
        this.container = container;
    }

    getContainer() {
        return this.container;
    }

    LayoutProcess() {

    }

    LayoutProcessPerItem(item) {

    }

    setLayoutPerItem(active) {
        this.active = active;
    }

    getLayoutPerItem() {
        return this.active;
    }

    getLayoutData(item) {
        if (item instanceof BaseSharedComponent) {
            return item.getData().get(ShareContainer.LayoutData);
        } else if (item instanceof Element) {
            return this.getContainer().getElementItem().get(item);
        }
    }
}

ShareLayout.ItemData = 'ItemData';