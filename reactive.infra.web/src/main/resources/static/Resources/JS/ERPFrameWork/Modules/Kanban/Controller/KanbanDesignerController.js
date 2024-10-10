import BaseController from "../../Common/BaseController.js";
import TabItem from "../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import KanbanDesignerView from "../View/KanbanDesignerView.js";

export default class KanbanDesignerController extends BaseController {
    constructor(parentContainer, recordId) {
        super();

        this.recordId = recordId;

        this.setView(new KanbanDesignerView());
        this.getView().setParentContainer(parentContainer);
        if (parentContainer instanceof TabItem)
            parentContainer.setTitle("KanbanDesigner");
    }

    initWithRecordID() {
        this.getView().getParentContainer().setLayout(new FitLayout());
        this.getView().getParentContainer().addItem(this.view);
    }
}