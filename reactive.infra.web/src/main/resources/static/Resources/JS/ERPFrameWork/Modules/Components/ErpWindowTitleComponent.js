import {HTMLComponent} from "../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";

export default class ErpWindowTitleComponent extends HTMLComponent {
    constructor() {
        super();

        this.pTag = DOM.createElement('p');
        DOM.addStyleAttribute(this.pTag, 'margin', 'auto');
        DOM.addStyleAttribute(this.pTag, 'padding', '7px');

        let masterDiv = DOM.createElement('div');
        masterDiv.appendChild(this.pTag);

        this.setElement(masterDiv);
    }

    setTitle(title) {
        this.title = title;

        if (this.getAttached()) {
            this.pTag.innerHTML = title;
        }
    }

    bindTheme() {
        super.bindTheme();
    }

    onLoad() {
        super.onLoad();

        this.setTitle(this.title);
    }

}