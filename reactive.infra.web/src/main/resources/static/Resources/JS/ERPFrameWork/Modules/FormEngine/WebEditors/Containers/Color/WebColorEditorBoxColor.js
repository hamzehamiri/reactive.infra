import {HTMLComponent} from "../../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import EditorColorRGBA from "../../../../../Communicate/Common/DataProvider/Impl/EditorColorRGBA.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";

export default class WebColorEditorBoxColor extends HTMLComponent {
    constructor(dataProviderColorRGBA) {
        super();
        this.dataProviderColorRGBA = dataProviderColorRGBA;
        if (dataProviderColorRGBA instanceof EditorColorRGBA) {
            this.addStyleAttribute('background-color', dataProviderColorRGBA.getRGBACssColor());
        }

        let pTag = DOM.createElement('p');
        pTag.innerHTML = dataProviderColorRGBA.getSimpleTextRGBA();
        DOM.addStyleAttribute(pTag, 'padding', '0px');
        DOM.addStyleAttribute(pTag, 'margin', '8px 0px 0px 0px');
        DOM.addStyleAttribute(pTag, 'font-size', '13px');

        let masterDiv = DOM.createElement('div');
        masterDiv.appendChild(pTag);

        this.setElement(masterDiv);
    }
}