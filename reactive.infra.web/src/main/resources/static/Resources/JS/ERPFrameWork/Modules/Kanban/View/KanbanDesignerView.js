import BaseView from "../../Common/BaseView.js";
import KanbanDesignerContainer from "../Components/KanbanDesignerContainer.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";

export default class KanbanDesignerView extends BaseView {
    constructor() {
        super();

        this.kanbanDesignerContainer = new KanbanDesignerContainer();

        this.setLayout(new FitLayout());
        this.addItem(this.kanbanDesignerContainer);
    }
}