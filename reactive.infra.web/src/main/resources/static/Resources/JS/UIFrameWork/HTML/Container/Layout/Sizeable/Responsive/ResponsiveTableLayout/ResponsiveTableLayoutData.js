import {ShareLayoutData} from "../../../../../../Shared/Layout/ShareLayoutData.js";
import ResponsiveTableLayoutDataElement from "./ResponsiveTableLayoutDataElement.js";
import {BaseModel} from "../../../../../../Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../../../ERPFrameWork/Communicate/Common/ConvertUtil.js";

export default class ResponsiveTableLayoutData extends ShareLayoutData {
    constructor() {
        super();
        this.elements = [];
    }

    addResponsiveTableLayoutDataElement(responsiveTableLayoutDataElement) {
        if (responsiveTableLayoutDataElement instanceof ResponsiveTableLayoutDataElement) {
            this.elements.push(responsiveTableLayoutDataElement);
        } else {
            throw 'Error Type Not ResponsiveTableLayoutDataElement';
        }
        return this;
    }

    getResponsiveTableLayoutDataElement() {
        if (this.elements && (this.elements.length > 0 && !(this.elements[0].constructor instanceof BaseModel))) {
            this.elements = ConvertUtil.ConvertGeneralWithArray(ResponsiveTableLayoutDataElement, this.elements);
        }
        return this.elements;
    }
}