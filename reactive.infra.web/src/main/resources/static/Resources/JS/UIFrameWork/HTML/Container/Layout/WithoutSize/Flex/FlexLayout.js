import {ShareLayout} from "../../../../../Shared/Layout/ShareLayout.js";
import {ShareContainer} from "../../../../../Shared/Layout/ShareContainer.js";
import FlexLayoutData from "./FlexLayoutData.js";
import {HTMLComponent} from "../../../../Component/HTMLComponent.js";
import {DOM} from "../../../../../Shared/Common/DOM.js";
import HTMLContainer from "../../../HTMLContainer.js";

export default class FlexLayout extends ShareLayout {
    constructor(flexDirection) {
        super();
        this.setFlexDirection(flexDirection);
    }

    setFlexDirection(flexDirection) {
        this.flexDirection = flexDirection;
    }

    LayoutProcess() {
        super.LayoutProcess();
        let that = this;
        DOM.setAttribute(this.getContainer().getElement(), "FlexLayout", "true");
        if (this.getContainer()) {
            this.getContainer().addStyleAttribute("display", "flex");
            // this.getContainer().addStyleAttribute("flex-wrap", "wrap");
            if (this.flexDirection) {
                this.getContainer().addStyleAttribute('flex-direction', this.flexDirection);
            }
            this.getContainer().getItems().forEach((item) => {
                let layoutData = that.getLayoutData(item);
                if (layoutData instanceof FlexLayoutData) {
                    if (item instanceof HTMLComponent) {
                        item.setParent(that.getContainer());
                        item.onAttach();
                        item.setMargin(layoutData.getLeft_Margin(), layoutData.getRight_Margin(), layoutData.getTop_Margin(), layoutData.getBottom_Margin());
                        if (item instanceof ShareContainer || item instanceof HTMLContainer) {
                            item.setParentNoSize(true);
                            item.cleanStyleItems();
                            this.setStyleAttributeLayoutData(item.getElement(), item, layoutData);
                        }
                    } else if (item instanceof Element) {
                        this.getContainer().getElement().appendChild(item);
                        this.setStyleAttributeLayoutData(item, null, layoutData);
                    }
                }
            });
            this.getContainer().getItems().forEach((item) => {
                if (item instanceof ShareContainer || item instanceof HTMLContainer) {
                    item.layoutExecute();
                }
            });
        }
    }

    setStyleAttributeLayoutData(element, item, layoutData) {
        if (layoutData.flexValue) {
            DOM.addStyleAttribute(element, 'flex', layoutData.flexValue);
            if (item)
                item.addStyleAttribute('flex', layoutData.flexValue);
        }
        DOM.setAttribute(element, "FlexLayoutData", "true");
    }
}

export const FlexDirection = {
    column: 'column',
    columnReverse: 'column-reverse',
    row: 'row'
}