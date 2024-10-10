import {DOM} from "../../../../Shared/Common/DOM.js";
import {ListView} from "../../../ListView/ListView.js";
import {TemplateLayout} from "../../../Container/Layout/Sizeable/Normal/Template/TemplateLayout.js";
import PivotGridComponent from "../PivotGridComponent.js";

export default class FieldDropListView extends ListView {
    constructor(region) {
        super();
        this.setLayout(new TemplateLayout('li'));
        this.setData(PivotGridComponent.RegionName, region);
    }

    getRegion() {
        return this.getData().get(PivotGridComponent.RegionName);
    }

    onLoad() {
        super.onLoad();
        DOM.addStyleAttribute(this.getElement(), "width", "100%");
        DOM.addStyleAttribute(this.getElement(), "height", "100%");
    }
}