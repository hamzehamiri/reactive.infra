import {ElementBodyLayout} from "../Container/Layout/Sizeable/Normal/ElementBodyLayout.js";
import {HTMLComponent} from "../Component/HTMLComponent.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export class BodyElementWidget extends HTMLContainer {

    constructor() {
        super();
        this.setLayout(new ElementBodyLayout());
    }

    static get() {
        if (!this.body) {
            this.body = new BodyElementWidget();
            this.body.setElement(document.body);
            this.body.setAttachedBefore(true);
            this.body.setAttached(true);
            this.body.setMargin(0, 0, 0, 0);
            this.body.addStyleAttribute("height", "100vh");
        }
        return this.body;
    }
}