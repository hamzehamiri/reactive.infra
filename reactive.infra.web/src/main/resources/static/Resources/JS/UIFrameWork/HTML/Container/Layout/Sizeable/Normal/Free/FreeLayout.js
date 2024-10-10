import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";
import {HTMLComponent} from "../../../../../Component/HTMLComponent.js";

export default class FreeLayout extends ShareLayout {
    constructor() {
        super();
    }

    LayoutProcess() {
        super.LayoutProcess();
        if (this.getContainer()) {
            let that = this;
            this.getContainer().getItems().forEach(function (item) {
                if (item instanceof HTMLComponent) {
                    item.setParent(that.getContainer());
                    item.onAttach();
                    // item.setPosition(xComponent, yComponent);
                    item.makePositionable(false);
                    item.setHeight(that.getContainer().getHeight());
                    item.addStyleAttribute('display' , 'inline');
                    // item.setSize(widthItem, heightItem);
                }
            });
        }
    }
}