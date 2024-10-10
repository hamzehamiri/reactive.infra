import {ListViewDragDropSource} from "../../../../../../UIFrameWork/HTML/DND/DragDropSources/ListViewDragDropSource.js";
import AnalyticReportSidePanelFieldsGenerator from "./AnalyticReportSidePanelFieldsGenerator.js";

export default class AnalyticReportSidePanelFieldsListViewDragDropSource extends ListViewDragDropSource {
    constructor(listView) {
        super(listView);
    }

    addItemReadyToDrop(items) {
        super.addItemReadyToDrop(items);
        if (items != null && items instanceof Array) {
            items.forEach(arrayValue => {
                let coreData = arrayValue[0].Value;
                this.component.addItem(AnalyticReportSidePanelFieldsGenerator.GeneratePivotFieldComponent(coreData, coreData.getTitle(), this.component));
            });
        }
    }
}