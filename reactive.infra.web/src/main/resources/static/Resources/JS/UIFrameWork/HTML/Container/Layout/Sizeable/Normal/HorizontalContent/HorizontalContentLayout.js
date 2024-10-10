import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";
import {HTMLComponent} from "../../../../../Component/HTMLComponent.js";
import {ShareContainer} from "../../../../../../Shared/Layout/ShareContainer.js";
import HorizontalContentLayoutData from "./HorizontalContentLayoutData.js";
import {Util} from "../../../../../../Shared/Common/Util.js";
import {DOM} from "../../../../../../Shared/Common/DOM.js";

export default class HorizontalContentLayout extends ShareLayout {
    constructor(layoutPerItem, isRTLProviderFunction) {
        super(layoutPerItem, isRTLProviderFunction);
    }

    LayoutProcess() {
        super.LayoutProcess();
        if (this.getContainer()) {
            let that = this;
            let xComponent = 0;
            let yComponent = 0;
            let widthItem = 0, heightItem = 0;
            this.getContainer().getItems().forEach(function (item) {
                if (item instanceof HTMLComponent) {
                    let layoutData = item.getData().get(ShareContainer.LayoutData);
                    if (layoutData instanceof HorizontalContentLayoutData) {

                        heightItem = that.getContainer().getHeight();

                        item.setParent(that.getContainer());
                        item.onAttach();
                        item.makePositionable(true);
                        item.setPosition(xComponent, yComponent, that.isRTLProviderFunction(that.getContainer()));
                        item.addStyleAttribute('display', 'inline');

                        let elementTitle = layoutData.getElementEffectiveFunction()();

                        let titleTextWidth = Util.getWithOfText(layoutData.getContent(), DOM.getFontFamily(elementTitle), DOM.getFontSize(elementTitle));
                        widthItem = titleTextWidth + 65;

                        item.setSize(widthItem, heightItem - 8);

                        xComponent += widthItem + layoutData.getRight_Margin() + layoutData.getLeft_Margin();
                    }
                }
            });
        }
    }
}