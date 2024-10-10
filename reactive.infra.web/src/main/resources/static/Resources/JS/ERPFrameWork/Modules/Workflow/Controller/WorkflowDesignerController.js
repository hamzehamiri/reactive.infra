import BaseController from "../../Common/BaseController.js";
import TabItem from "../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import WorkflowDesignerView from "../View/WorkflowDesignerView.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";

export default class WorkflowDesignerController extends BaseController {
    constructor(parentContainer, recordId) {
        super();

        this.recordId = recordId;

        this.setView(new WorkflowDesignerView());
        this.getView().setParentContainer(parentContainer);
        if (parentContainer instanceof TabItem)
            parentContainer.setTitle("WorkflowDesigner");
    }

    initWithRecordID() {
        this.getView().getParentContainer().setLayout(new FitLayout());
        this.getView().getParentContainer().addItem(this.view);
    }
}