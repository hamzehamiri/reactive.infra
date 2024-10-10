import PivotFieldComponent from "../../../../../../UIFrameWork/HTML/Cells/Pivot/Field/PivotFieldComponent.js";
import FieldDropListView from "../../../../../../UIFrameWork/HTML/Cells/Pivot/Field/FieldDropListView.js";
import {AnalyticReportConstant} from "../../Command/AnalyticReportConstant.js";

export default class AnalyticReportSidePanelFieldsGenerator {
    static GeneratePivotFieldComponent(coreAnalyticReportFieldDTO, display, fieldDropListView) {
        if (fieldDropListView instanceof FieldDropListView) {
            let pivotFieldComponent = new PivotFieldComponent();
            pivotFieldComponent.setLabelTitle(display);
            pivotFieldComponent.setData(AnalyticReportConstant.CoreAnalyticReportFieldDTO, coreAnalyticReportFieldDTO);
            return pivotFieldComponent;
        }
    }
}