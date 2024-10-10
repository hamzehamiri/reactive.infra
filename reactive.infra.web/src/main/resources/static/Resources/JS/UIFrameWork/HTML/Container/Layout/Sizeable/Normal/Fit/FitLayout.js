import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";
import {ItemValidationType, LimitItemValidation} from "../LimitItemValidation.js";
import {DOM} from "../../../../../../Shared/Common/DOM.js";

export class FitLayout extends ShareLayout {
    constructor(hiddenOtherElement, scrollType, marginTop, marginRight, marginBottom, marginLeft) {
        super(true);

        let limit = new LimitItemValidation();
        limit.setItemValidationType(ItemValidationType.Limited);
        limit.setItemCounts(1);

        this.setLimitItemValidation(limit);
        this.setMargin(marginTop, marginRight, marginBottom, marginLeft);

        this.hiddenOtherElement = hiddenOtherElement;
        this.scrollType = scrollType;
    }

    ActivePreProcessLayout(component) {
        super.ActivePreProcessLayout(component);
        this.getContainer().getItems().forEach(itemCheck => {
            if (itemCheck.getUUID() !== component.getUUID()) {
                itemCheck.setData("active", false);
            } else {
                itemCheck.setData("active", true);
            }
        });
    }

    LayoutProcessPerItem(item) {
        super.LayoutProcessPerItem(item);
        DOM.setAttribute(this.getContainer().getElement(), "FitLayout", "true");

        if (item.getData().get('active')) {
            let size = this.getSizeContainer();

            if (!item.getAttached()) {
                item.setParent(this.getContainer());
                item.onAttach();
                item.makePositionable(false);
            }

            item.setSize(size.widthItem, size.heightItem);
            if (this.hiddenOtherElement) {
                item.removeStyleAttribute("overflow");
            }
            if (this.scrollType) {
                DOM.setScrollMode(item.getElement(), this.scrollType);
            }
        } else {
            item.setSize(0, 0);
            if (this.hiddenOtherElement) {
                item.addStyleAttribute("overflow", "hidden");
            }
        }
    }

    getSizeContainer() {
        let computeMargin = this.computeMargin();

        if (this.getContainer().getFixSize()) {
            let width = this.getContainer().getStyleAttribute().get("width");
            let height = this.getContainer().getStyleAttribute().get("height");
            return {
                widthItem: width ? width.replace('px', '') - computeMargin.incWidth : 0,
                heightItem: height ? height.replace('px', '') - computeMargin.incHeight : 0
            }
        } else {
            return {
                widthItem: this.getContainer().getOffsetWidth(),
                heightItem: this.getContainer().getOffsetHeight()
            }
        }
    }
}