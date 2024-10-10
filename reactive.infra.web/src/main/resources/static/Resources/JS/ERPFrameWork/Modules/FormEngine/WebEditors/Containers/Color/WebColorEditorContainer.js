import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RowLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import WebSliderEditor from "../../WebSliderEditor.js";
import {EventFrameWork} from "../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import RGBAlphaContainer from "./RGBAlphaContainer.js";
import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class WebColorEditorContainer extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.hsv = DOM.createElement('div');
        DOM.addStyleAttribute(this.hsv, 'background', 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, #000 100%), linear-gradient(to right, #fff 0, rgba(255, 255, 255, 0) 100%)');
        DOM.addStyleAttribute(this.hsv, 'height', '100%');

        this.hsv_master = DOM.createElement('div');
        this.hsv_master.appendChild(this.hsv);
        DOM.addStyleAttribute(this.hsv_master, 'background-color', 'rgb(255, 0, 0)');

        this.setDataElement(WebColorEditorContainer.DataElement.HSVElement, this.hsv);
        this.setDataElement(WebColorEditorContainer.DataElement.HSVMasterElement, this.hsv_master);

        let webSliderEditor_hsv = new WebSliderEditor();
        DOM.addStyleAttribute(webSliderEditor_hsv.getTrackSliderDiv(), 'background', 'linear-gradient(to right, #f00 0, #ff0 16%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 84%, #ff0004 100%)')
        webSliderEditor_hsv.addListener(EventFrameWork.event.Editors.FieldChangeEvent, (editorEvent) => {
            let val = webSliderEditor_hsv.getValue();
            let dColor = 255 / 0.125;
            let hsvJson = {r: 0, g: 0, b: 0};
            if (val > 0 && val <= 0.125) {
                hsvJson.r = 255;
                hsvJson.g = dColor * (val - 0);
                hsvJson.b = 0;
            } else if (val > 0.125 && val <= 0.25) {
                hsvJson.r = (dColor * (val - 0.125)) - 255;
                hsvJson.g = 255;
                hsvJson.b = 0;
            } else if (val > 0.25 && val <= 0.375) {
                hsvJson.r = 0;
                hsvJson.g = 255;
                hsvJson.b = dColor * (val - 0.25);
            } else if (val > 0.375 && val <= 0.5) {
                hsvJson.r = 0;
                hsvJson.g = (dColor * (val - 0.375)) - 255;
                hsvJson.b = 255;
            } else if (val > 0.5 && val <= 0.625) {
                hsvJson.r = 0;
                hsvJson.g = 255;
                hsvJson.b = (dColor * (val - 0.5));
            } else if (val > 0.625 && val <= 0.75) {
                hsvJson.r = (dColor * (val - 0.625));
                hsvJson.g = 0;
                hsvJson.b = 255;
            } else if (val > 0.75 && val <= 0.875) {
                hsvJson.r = 255;
                hsvJson.g = 0;
                hsvJson.b = (dColor * (val - 0.75)) - 255;
            } else if (val > 0.875 && val <= 1) {
                hsvJson.r = 255;
                hsvJson.g = 0;
                hsvJson.b = (dColor * (val - 0.75)) - 255;
            }

            DOM.addStyleAttribute(this.hsv_master, 'background-color', `rgb(${hsvJson.r}, ${hsvJson.g}, ${hsvJson.b})`);
        });
        let webSliderEditor_alpha = new WebSliderEditor();
        DOM.addStyleAttribute(webSliderEditor_alpha.getTrackSliderDiv(), 'background', 'linear-gradient(to right, rgba(43, 32, 206, 0) 0%, rgb(43, 32, 206) 100%)')

        this.rgbAlphaContainer = new RGBAlphaContainer();

        this.addItem(this.hsv_master, RowLayoutData.factory(1, 0.5, 1, 1, 1, 1, true));
        this.addItem(webSliderEditor_hsv, RowLayoutData.factory(1, 30, 1, 1, 3, 1, true));
        this.addItem(webSliderEditor_alpha, RowLayoutData.factory(1, 30, 1, 1, 3, 1, true));
        this.addItem(this.rgbAlphaContainer, RowLayoutData.factory(1, 30, 1, 1, 3, 1, true));
    }

    getRGBAlphaContainer() {
        return this.rgbAlphaContainer;
    }

    bindModelToUi() {

    }

    bindUiToModel() {
        return this.getRGBAlphaContainer().bindUiToModel();
    }
}

WebColorEditorContainer.DataElement = {
    HSVElement: 'HSVElement',
    HSVMasterElement: 'HSVMasterElement',
}