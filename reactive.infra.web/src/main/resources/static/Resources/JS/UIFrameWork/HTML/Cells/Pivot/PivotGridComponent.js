import {HTMLComponent} from "../../Component/HTMLComponent.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import {RegisterComponent} from "../../../Shared/BaseShared/RegisterComponent.js";
import FieldDropListView from "./Field/FieldDropListView.js";

export default class PivotGridComponent extends HTMLComponent {
    constructor() {
        super();

        this.bindTheme();

        this.filterFieldDropListView = new FieldDropListView(PivotGridComponent.Region().Filter);
        this.dataFieldDropListView = new FieldDropListView(PivotGridComponent.Region().Data);
        this.rowFieldDropListView = new FieldDropListView(PivotGridComponent.Region().Row);
        this.columnFieldDropListView = new FieldDropListView(PivotGridComponent.Region().Column);

        this.col1 = DOM.createElement('col');
        DOM.addStyleAttribute(this.col1, "width", "100px");
        this.col2 = DOM.createElement('col');
        DOM.addStyleAttribute(this.col2, "width", "100%");

        this.colGroupMaster = DOM.createElement('colgroup');
        this.colGroupMaster.appendChild(this.col1);
        this.colGroupMaster.appendChild(this.col2);

        this.tdFilter = DOM.createElement('td');
        this.tdFilter.setAttribute("colspan", "2");
        DOM.addClassName(this.tdFilter, this.getMasterTableTr1FilterFieldClass());

        this.trRow1 = DOM.createElement('tr');
        this.trRow1.appendChild(this.tdFilter);
        DOM.addClassName(this.trRow1, this.getMasterTableTr1Class());

        this.tdDataField = DOM.createElement('td');
        DOM.addClassName(this.tdDataField, this.getMasterTableTr2DataFieldClass());

        this.tdColumnField = DOM.createElement('td');
        DOM.addClassName(this.tdColumnField, this.getMasterTableTr2ColumnFieldClass());

        this.trRow2 = DOM.createElement('tr');
        this.trRow2.appendChild(this.tdDataField);
        this.trRow2.appendChild(this.tdColumnField);
        DOM.addClassName(this.trRow2, this.getMasterTableTr2Class());

        this.tdRowField = DOM.createElement('td');
        DOM.addClassName(this.tdRowField, this.getMasterTableTr3RowFieldClass());

        this.tdColumnGrid = DOM.createElement('td');
        this.tdColumnGrid.innerHTML = "Column Grid";
        DOM.addClassName(this.tdColumnGrid, this.getMasterTableTr3ColumnGridClass());

        this.trRow3 = DOM.createElement('tr');
        this.trRow3.appendChild(this.tdRowField);
        this.trRow3.appendChild(this.tdColumnGrid);
        DOM.addClassName(this.trRow3, this.getMasterTableTr3Class());

        this.tdRowGrid = DOM.createElement('td');
        this.tdRowGrid.innerHTML = "Row Grid";
        DOM.addClassName(this.tdRowGrid, this.getMasterTableTr4RowGridClass());

        this.tdDataGrid = DOM.createElement('td');
        this.tdDataGrid.innerHTML = "Data Grid";
        DOM.addClassName(this.tdDataGrid, this.getMasterTableTr4DataGridClass());

        this.trRow4 = DOM.createElement('tr');
        this.trRow4.appendChild(this.tdRowGrid);
        this.trRow4.appendChild(this.tdDataGrid);
        DOM.addClassName(this.trRow4, this.getMasterTableTr4Class());

        this.tbodyMaster = DOM.createElement('tbody');
        this.tbodyMaster.appendChild(this.trRow1);
        this.tbodyMaster.appendChild(this.trRow2);
        this.tbodyMaster.appendChild(this.trRow3);
        this.tbodyMaster.appendChild(this.trRow4);

        this.tableMaster = DOM.createElement('table');
        this.tableMaster.appendChild(this.colGroupMaster);
        this.tableMaster.appendChild(this.tbodyMaster);
        DOM.addClassName(this.tableMaster, this.getMasterTableClass());

        this.setElement(this.tableMaster);
    }

    onLoad() {
        super.onLoad();

        this.filterFieldDropListView.setParent(this);
        this.filterFieldDropListView.onAttach(this.tdFilter);

        this.dataFieldDropListView.setParent(this);
        this.dataFieldDropListView.onAttach(this.tdDataField);

        this.rowFieldDropListView.setParent(this);
        this.rowFieldDropListView.onAttach(this.tdRowField);

        this.columnFieldDropListView.setParent(this);
        this.columnFieldDropListView.onAttach(this.tdColumnField);
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.PivotGridComponent[0]));
    }

    getFieldDropListView(pivotGridComponentRegion) {
        let region = PivotGridComponent.Region();
        switch (pivotGridComponentRegion.description) {
            case region.None.description:
                return null;
            case region.Row.description:
                return this.rowFieldDropListView;
            case region.Data.description:
                return this.dataFieldDropListView;
            case region.Column.description:
                return this.columnFieldDropListView;
            case region.Filter.description:
                return this.filterFieldDropListView;
        }
    }

    getMasterTableClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterTable);
    }

    getMasterTableTr1Class() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr1);
    }

    getMasterTableTr2Class() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2);
    }

    getMasterTableTr3Class() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3);
    }

    getMasterTableTr4Class() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4);
    }

    getMasterTableTr1FilterFieldClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr1_FilterField);
    }

    getMasterTableTr2DataFieldClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2_DataField);
    }

    getMasterTableTr2ColumnFieldClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2_ColumnField);
    }

    getMasterTableTr3RowFieldClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3_RowField);
    }

    getMasterTableTr3ColumnGridClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3_ColumnGrid);
    }

    getMasterTableTr4RowGridClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4_RowGrid);
    }

    getMasterTableTr4DataGridClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4_DataGrid);
    }
}

PivotGridComponent.Region = () => {
    return Object.freeze({
        Filter: Symbol("Filter"),
        Data: Symbol("Data"),
        Column: Symbol("Column"),
        Row: Symbol("Row"),
        None: Symbol("None")
    });
}

PivotGridComponent.RegionName = "RegionName";