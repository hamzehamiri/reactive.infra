import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";
import {ItemValidationType, LimitItemValidation} from "../LimitItemValidation.js";
import {RowLayoutData} from "./RowLayoutData.js";
import {ShareContainer} from "../../../../../../Shared/Layout/ShareContainer.js";
import {HTMLComponent} from "../../../../../Component/HTMLComponent.js";
import {DOM} from "../../../../../../Shared/Common/DOM.js";
import {Util} from "../../../../../../Shared/Common/Util.js";

export class RowLayout extends ShareLayout {
    constructor(rowLayout_Mode, isRTLProviderFunction, scrollType, marginTop, marginRight, marginBottom, marginLeft) {
        super(false, isRTLProviderFunction);

        this.setMargin(marginTop, marginRight, marginBottom, marginLeft);

        let limit = new LimitItemValidation();
        limit.setItemValidationType(ItemValidationType.NonLimited);
        limit.setItemCounts(30);

        this.scrollType = scrollType;

        this.setLimitItemValidation(limit);
        this.setRowLayoutMode(rowLayout_Mode);
    }

    addWidthStatic(width, remove) {
        if (!this.width)
            this.width = 0;
        if (remove) {
            this.width -= width;
        } else {
            this.width += width;
        }
    }

    getWidthStatic() {
        if (!this.width)
            this.width = 0;
        return this.width;
    }

    addHeightStatic(height, remove) {
        if (!this.height)
            this.height = 0;
        if (remove) {
            this.height -= height;
        } else {
            this.height += height;
        }
    }

    getHeightStatic() {
        if (!this.height)
            this.height = 0;
        return this.height;
    }

    setRowLayoutMode(rowLayout_Mode) {
        this.rowLayout_Mode = rowLayout_Mode;
    }

    getRowLayoutMode() {
        if (!this.rowLayout_Mode)
            this.rowLayout_Mode = RowLayout_Mode.Horizontal;
        return this.rowLayout_Mode;
    }

    ActivePreProcessLayout(component, remove) {
        if (component instanceof HTMLComponent) {
            let layoutData = component.getData().get(ShareContainer.LayoutData);
            if (layoutData instanceof RowLayoutData) {
                this.addStaticLayout(layoutData, remove);
            }
        } else if (component instanceof Element) {
            let layoutData = this.getContainer().getElementItem().get(component);
            if (layoutData instanceof RowLayoutData) {
                this.addStaticLayout(layoutData, remove);
            }
        }
    }

    addStaticLayout(layoutData, remove) {
        if (layoutData.getWidth() > 1) {
            this.addWidthStatic(layoutData.getWidth(), remove);
        }
        if (layoutData.getHeight() > 1) {
            this.addHeightStatic(layoutData.getHeight(), remove);
        }
    }

    LayoutProcess() {
        super.LayoutProcess();
        DOM.setAttribute(this.getContainer().getElement(), "RowLayout", "true");
        if (this.getContainer()) {
            let xComponent = 0;
            let yComponent = 0;
            let firstItem = true;
            let computeMargin = this.computeMargin();

            let widthOfContainer = this.getContainer().getWidth() - computeMargin.incWidth;
            let heightOfContainer = this.getContainer().getHeight() - computeMargin.incHeight;

            for (let [, item] of this.getContainer().getItems()) {
                let layoutData = this.getLayoutData(item);

                if (layoutData instanceof RowLayoutData) {
                    if (layoutData.getSimpleRender()) {
                        if (item instanceof Element) {
                            if (!DOM.hasChildren(this.getContainer().getElement(), item)) {
                                this.getContainer().getElement().appendChild(item);
                            }
                        }
                    } else {
                        let widthItem;
                        let heightItem;
                        if (layoutData.getWidth() <= 1) {
                            widthItem = (widthOfContainer - this.getWidthStatic()) * layoutData.getWidth() - (layoutData.getRight_Margin() + layoutData.getLeft_Margin());
                        } else {
                            widthItem = layoutData.getWidth() - (layoutData.getRight_Margin() + layoutData.getLeft_Margin());
                        }
                        if (layoutData.getHeight() <= 1) {
                            heightItem = (heightOfContainer - this.getHeightStatic()) * layoutData.getHeight() - (layoutData.getBottom_Margin() + layoutData.getTop_Margin());
                        } else {
                            heightItem = layoutData.getHeight() - (layoutData.getBottom_Margin() + layoutData.getTop_Margin());
                        }
                        if (this.getRowLayoutMode() === RowLayout_Mode.Horizontal) {
                            xComponent += layoutData.getLeft_Margin();
                            if (firstItem)
                                yComponent += layoutData.getTop_Margin();
                        } else {
                            if (firstItem)
                                xComponent += layoutData.getLeft_Margin();
                            yComponent += layoutData.getTop_Margin();
                        }

                        this.drawItem(item, xComponent, yComponent, widthItem, heightItem);

                        if (this.getRowLayoutMode() === RowLayout_Mode.Horizontal) {
                            xComponent += widthItem + layoutData.getRight_Margin();
                        } else {
                            if (layoutData.getBorderCheck()) {
                                let border = Util.checkBorderWidth(item);
                                let offset = border.all > 0 ? border.all : border.top + border.bottom;

                                if (offset > 0) {
                                    yComponent -= offset;

                                    this.drawItemSimple(item, xComponent, yComponent);
                                }
                            }
                            yComponent += heightItem + layoutData.getBottom_Margin();
                        }
                        firstItem = false;
                    }
                }
            }

            if (this.scrollType) {
                DOM.setScrollMode(this.getContainer().getElement(), this.scrollType);
            }
        }
    }

    drawItemSimple(item, xComponent, yComponent) {
        if (item instanceof HTMLComponent) {
            item.setPosition(xComponent, yComponent, this.isRTLProviderFunction(this.getContainer()));
            DOM.setAttribute(item.getElement(), "RowLayoutData", "true");
        } else if (item instanceof Element) {
            DOM.setPosition(item, xComponent, yComponent, true);
            DOM.setAttribute(item.getElement(), "RowLayoutData", this.isRTLProviderFunction(this.getContainer()));
        }
    }

    drawItem(item, xComponent, yComponent, widthItem, heightItem) {
        if (item instanceof HTMLComponent) {
            if (!item.getAttached()) {
                item.setParent(this.getContainer());
                item.onAttach();
            }
            item.makePositionable(true);
            item.setPosition(xComponent, yComponent, this.isRTLProviderFunction(this.getContainer()));
            item.setSize(widthItem, heightItem);
            DOM.setAttribute(item.getElement(), "RowLayoutData", "true");
        } else if (item instanceof Element) {
            if (!DOM.hasChildren(this.getContainer().getElement(), item)) {
                this.getContainer().getElement().appendChild(item);
                DOM.makePositionable(item, true);
            }
            DOM.setHeight(item, heightItem);
            DOM.setWidth(item, widthItem);
            DOM.setPosition(item, xComponent, yComponent, this.isRTLProviderFunction(this.getContainer()));
            DOM.setAttribute(item, "RowLayoutData", "true");
        }
    }
}

export const RowLayout_Mode = {
    Vertical: 'Vertical',
    Horizontal: 'Horizontal'
};
