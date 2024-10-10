import {ShareLayout} from "../../../../../Shared/Layout/ShareLayout.js";
import {HTMLComponent} from "../../../../Component/HTMLComponent.js";

export class GridLayout extends ShareLayout {
    constructor() {
        super();
    }

    LayoutProcess() {
        super.LayoutProcess();
        let that = this;
        if (this.getContainer()) {
            if (this.getContainer() instanceof HTMLComponent) {
                this.getContainer().addStyleAttribute("display", "flex");
            }
            this.getContainer().getItems().forEach((item) => {
                if (item instanceof HTMLComponent) {
                    item.setParent(that.getContainer());
                    item.addStyleAttribute("width", "calc(33.3333% - 0px)");
                    item.onAttach();
                } else if (item instanceof Element) {
                    that.getContainer().getElement().appendChild(item);
                }
            });
        }
    }
}