import {ShareLayout} from "../../../../../../UIFrameWork/Shared/Layout/ShareLayout.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import GraphTabSVGLayoutData from "./GraphTabSVGLayoutData.js";

export default class GraphTabSVGLayout extends ShareLayout {
    constructor() {
        super();
    }

    LayoutProcess() {
        super.LayoutProcess();
        let that = this;
        let nameSpace = this.getContainer().getNameSpace();
        DOM.setAttributeNS(nameSpace, this.getContainer().getElement(), "GraphTabSVGLayout", "true");
        let minX = 0, minY = 0, maxX = 0, maxY = 0;
        if (this.getContainer()) {
            this.getContainer().getItems().forEach((item) => {
                let layoutData = that.getLayoutData(item);
                if (layoutData instanceof GraphTabSVGLayoutData) {
                    if (!item.getAttached()) {
                        item.setParent(this.getContainer());
                        item.onAttach();
                        item.makePositionable(true);
                    }
                    item.setPosition(layoutData.getX(), layoutData.getY());
                    item.setWidth(layoutData.getWidth());
                    item.setHeight(layoutData.getHeight());

                    maxX = Math.max(maxX, layoutData.getX() + layoutData.getWidth());
                    maxY = Math.max(maxY, layoutData.getY() + layoutData.getHeight());
                }

                DOM.setAttributeNS(nameSpace, item.getElement(), "GraphTabSVGLayoutData", "true");
            });

            this.getContainer().getParent().setSVGEl(maxX, maxY);
        }
    }
}