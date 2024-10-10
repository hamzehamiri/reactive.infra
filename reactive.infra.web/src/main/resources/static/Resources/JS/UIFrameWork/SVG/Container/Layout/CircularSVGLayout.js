import {ShareLayout} from "../../../Shared/Layout/ShareLayout.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import CircularSVGLayoutData from "./CircularSVGLayoutData.js";

export default class CircularSVGLayout extends ShareLayout {
    constructor() {
        super();
    }

    setRadius(radius) {
        this.radius = radius;
    }

    setBasePointX(basePointX) {
        this.basePointX = basePointX;
    }

    setBasePointY(basePointY) {
        this.basePointY = basePointY;
    }

    LayoutProcess() {
        super.LayoutProcess();
        let that = this;
        let nameSpace = this.getContainer().getNameSpace();
        DOM.setAttributeNS(nameSpace, this.getContainer().getElement(), "CircularSVGLayout", "true");
        if (this.getContainer()) {
            this.getContainer().getItems().forEach((item) => {
                let layoutData = that.getLayoutData(item);
                if (layoutData instanceof CircularSVGLayoutData){
                    if (!item.getAttached()) {
                        item.setParent(this.getContainer());
                        item.onAttach();
                        item.makePositionable(true);
                    }
                }

                DOM.setAttributeNS(nameSpace, item.getElement(), "CircularSVGLayoutData", "true");
            });
        }
    }
}