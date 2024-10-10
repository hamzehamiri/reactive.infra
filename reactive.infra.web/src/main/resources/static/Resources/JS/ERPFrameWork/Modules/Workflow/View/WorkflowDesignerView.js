import BaseView from "../../Common/BaseView.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {LayoutContainer} from "../../../../UIFrameWork/HTML/Container/LayoutContainer.js";

export default class WorkflowDesignerView extends BaseView {
    constructor() {
        super();

        this.workflowDesignerComponent = new LayoutContainer();

        this.setLayout(new FitLayout());
        this.addItem(this.wizardComponent);
    }
}