import {ShareLayout} from "../../Shared/Layout/ShareLayout.js";
import {DOM, Cursor} from "../../Shared/Common/DOM.js";
import {ShareContainer} from "../../Shared/Layout/ShareContainer.js";
import {ResizeLayoutData} from "./ResizeLayoutData.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";

export class ResizeLayout extends ShareLayout {
    constructor(component, dragByLang) {
        super(true);
        this.component = component;
        this.dragByLang = dragByLang;
    }

    setComponentForResize(component) {
        this.component = component;
    }

    LayoutProcessPerItem(item) {
        super.LayoutProcessPerItem(item);
        this.isRTL = true;

        let offsetGapResizer = 5;
        let offsetLeft = this.component.getElement().offsetLeft;
        let offsetTop = this.component.getElement().offsetTop;
        let boundingClientRect = DOM.getBoundingClientRect(this.component.getElement());
        let ZIndex = this.component.getZIndex();

        let layoutData = item.getData().get(ShareContainer.LayoutData);
        if (layoutData instanceof ResizeLayoutData) {
            let xComponent = 0, yComponent = 0, size, cursor;
            switch (layoutData.getType()) {
                case ResizeLayoutData.Type.Left :
                    if (this.dragByLang && RegisterComponent.getCurrentLanguage().getIsRTL()) {
                        xComponent = offsetLeft - offsetGapResizer;
                        yComponent = offsetTop;
                    } else {
                        xComponent = offsetLeft - offsetGapResizer;
                        yComponent = offsetTop;
                    }

                    size = [5, boundingClientRect.height];
                    cursor = Cursor.colresize;
                    break;
                case ResizeLayoutData.Type.Right :
                    if (this.dragByLang && RegisterComponent.getCurrentLanguage().getIsRTL()) {
                        xComponent = offsetLeft + boundingClientRect.width;
                        yComponent = offsetTop;
                    } else {
                        xComponent = boundingClientRect.right;
                        yComponent = offsetTop;
                    }

                    size = [5, boundingClientRect.height];
                    cursor = Cursor.colresize;
                    break;
                case ResizeLayoutData.Type.Top :
                    if (this.dragByLang && RegisterComponent.getCurrentLanguage().getIsRTL()) {
                        xComponent = offsetLeft;
                        yComponent = offsetTop - offsetGapResizer;
                    } else {
                        xComponent = offsetLeft;
                        yComponent = offsetTop - offsetGapResizer;
                    }

                    size = [boundingClientRect.width, offsetGapResizer];
                    cursor = Cursor.rowresize;
                    break;
                case ResizeLayoutData.Type.Bottom :
                    if (this.dragByLang && RegisterComponent.getCurrentLanguage().getIsRTL()) {
                        xComponent = offsetLeft;
                        yComponent = offsetTop + boundingClientRect.height - offsetGapResizer;
                    } else {
                        xComponent = offsetLeft;
                        yComponent = offsetTop + boundingClientRect.height - offsetGapResizer;
                    }

                    size = [boundingClientRect.width, offsetGapResizer];
                    cursor = Cursor.rowresize;
                    break;
            }
            if (size) {
                item.setParent(this.getContainer());
                item.onAttach();
                item.makePositionable(true);
                item.setZIndex(ZIndex);
                item.setCursor(cursor);
                item.setPosition(xComponent, yComponent, this.dragByLang ? RegisterComponent.getCurrentLanguage().getIsRTL() : null);
                item.setSize(size[0], size[1]);
            }
        }
    }
}