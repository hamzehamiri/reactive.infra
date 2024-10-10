import {ShareLayout} from "../../../../../Shared/Layout/ShareLayout.js";
import {DOM} from "../../../../../Shared/Common/DOM.js";
import {HTMLComponent} from "../../../../Component/HTMLComponent.js";

export default class InlineBlockLayout extends ShareLayout {
    constructor() {
        super();
    }

    LayoutProcess() {
        super.LayoutProcess();
        let that = this;
        DOM.setAttribute(this.getContainer().getElement(), "InlineBlockLayout", "true");
        if (this.getContainer()) {
            this.getContainer().addStyleAttribute("display", "inline-block");
            this.getContainer().getItems().forEach((item) => {
                let layoutData = that.getLayoutData(item);
                if (item instanceof HTMLComponent) {
                    item.setParent(that.getContainer());
                    item.onAttach();
                } else if (item instanceof Element) {
                    this.getContainer().getElement().appendChild(item);
                }
            });
        }
    }
}