import {ShareLayout} from "../../../../../Shared/Layout/ShareLayout.js";
import {ShareContainer} from "../../../../../Shared/Layout/ShareContainer.js";
import {HTMLComponent} from "../../../../Component/HTMLComponent.js";
import HTMLContainer from "../../../HTMLContainer.js";

export class ElementBodyLayout extends ShareLayout {
    constructor() {
        super(true);
    }

    LayoutProcessPerItem(item) {
        super.LayoutProcessPerItem(item);
        if (item instanceof ShareContainer || item instanceof HTMLContainer) {
            item.setParent(this.getContainer());
            item.onAttach();
            item.layoutExecute();
        } else if (item instanceof HTMLComponent) {
            item.setParent(this.getContainer());
            item.onAttach();
        } else if (item instanceof Element) {
            this.getContainer().getElement().appendChild(item);
        }
    }
}