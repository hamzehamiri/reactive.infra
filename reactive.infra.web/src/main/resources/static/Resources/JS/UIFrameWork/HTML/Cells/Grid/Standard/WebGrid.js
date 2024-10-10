import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {GridModelSelection} from "./GridModelSelection.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {ColumnDragComponent} from "./ColumnDragComponent.js";
import {ColumnDragLayout} from "./ColumnDragLayout.js";
import {WebColumnConfig} from "./WebColumnConfig.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {DragColumnEvent} from "./DragColumnEvent.js";
import {ColumnHeader} from "./ColumnHeader.js";
import {WebGridEditor} from "./WebGridEditor.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";

export class WebGrid extends HTMLContainer {
    constructor() {
        super();

        this.setScrollType(HTMLComponent.ScrollType.Auto);
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.StandardGrid[0]));
        this.setElement(document.createElement("div"));
        this.setLayout(new ColumnDragLayout(this))

        this.gridModelSelection = new GridModelSelection();
        this.gridEditor = new WebGridEditor();
    }

    onLoad() {
        super.onLoad();
        this.refreshUI();
        this.gridModelSelection.bindEventToGrid(this);
        this.gridEditor.bindEventToGrid(this);
    }

    onDetach() {
        super.onDetach();
    }

    refreshUI() {
        if (this.getAttached()) {
            this.getElement().replaceChildren();

            this.tbody = document.createElement('tbody');
            this.columnTDs = new Map();

            this.table = document.createElement('table');
            this.table.appendChild(this.tbody);
            this.table.setAttribute("class", this.getTableClass());

            this.getElement().appendChild(this.table);
        }

        this.generateRows();
        this.generateHeader();
        this.renderHeader();
        this.generateColumnResizer();
    }

    generateRows() {
        let odd = false;
        let totalWidthTable = this.getTotalWidthColumns();
        for (let index = 0; index < this.records.length; index++) {
            let rec = this.records[index];
            let strip = this.stripRow ? (odd ? ' ' + this.getStripClass() : '') : '';
            let tr = this.generateRow(rec, strip);
            odd = !odd;
            this.tbody.appendChild(tr);
        }
        this.table.setAttribute("style", "width : " + totalWidthTable + "px");
    }

    generateRow(rec, strip) {
        let tr = document.createElement('tr');
        tr.setAttribute('class', this.getTRClass() + strip);
        for (let colIndex = 0; colIndex < this.columnConfigs.length; colIndex++) {
            let colConfig = this.columnConfigs[colIndex];
            let modelCellValue = this.recordDescriptorForCell(rec, colConfig.getKeyForModelCell());
            let cellValue = modelCellValue === undefined ? '' : modelCellValue;
            let styleTD = WebColumnConfig.generateStyleTD(colConfig);

            let td = document.createElement('td');
            td.setAttribute('class', this.getTDClass() + ' ' + this.getBaseText());
            td.setAttribute('style', styleTD);
            td.innerHTML = cellValue;

            tr.appendChild(td);

            this.generateTDs(colIndex, td);
        }
        return tr;
    }

    generateTDs(colIndex, td) {
        let tdsOld = this.columnTDs.get(colIndex);
        if (tdsOld !== undefined) {
            tdsOld.push(td);
        } else {
            let tds = [];
            tds.push(td);
            this.columnTDs.set(colIndex, tds);
        }
    }

    isValidColumnConfig(columnConfig) {
        return true;
    }

    generateHeader() {
        if (!this.header) {
            this.header = new ColumnHeader();
            this.header.setParent(this);
            this.header.onAttach(this.table);
        }
        this.header.setHeaderClass(this.getHeaderClass());
        this.header.setBaseTextClass(this.getBaseText());
    }

    renderHeader() {
        this.header.setColumnConfigs(this.columnConfigs);
    }

    getTotalWidthColumns() {
        let totalWidth = 0;
        this.columnConfigs.forEach(col => {
            totalWidth += col.getFixWidth();
        });
        return totalWidth;
    }

    generateColumnResizer() {
        let that = this;

        this.columnTDs.forEach((tds, column) => {
            let colConfig = that.columnConfigs[column];
            let resizer = new ColumnDragComponent(tds, colConfig, that);
            resizer.addListener(EventFrameWork.event.MouseEvent.mouseup, this.onPositionDragEnd, that);
            that.addItem(resizer)
        })
    }

    onPositionDragComponent(event) {
        if (event instanceof DragColumnEvent) {
            let columnDragComponent = event.getColumnDragComponent();
            let width = columnDragComponent.getColumnConfig().getFixWidth() + event.getDx() + this.getElement().scrollLeft;

            this.updateColumnDragComponent(columnDragComponent, width);

            let totalWidthTable = this.getTotalWidthColumns();
            this.table.setAttribute("style", "width : " + totalWidthTable + "px");
        }
    }

    updateColumnDragComponent(columnDragComponent, width) {
        let colConfig = columnDragComponent.getColumnConfig();
        colConfig.setFixWidth(width);

        columnDragComponent.getTdList().forEach((td) => {
            let styleTD = WebColumnConfig.generateStyleTD(colConfig);
            td.setAttribute('style', styleTD);
        });
    }

    onPositionDragEnd(event) {
        this.onPositionDragComponent(event);
        this.layoutExecute();
    }

    setDataBindUI(records, refresh) {
        this.records = records;
        if (refresh)
            this.refreshUI();
    }

    setRecordDescriptorForCell(recordDescriptorForCell) {
        this.recordDescriptorForCell = recordDescriptorForCell;
    }

    setEditorDescriptor(editorDescriptor) {
        this.editorDescriptor = editorDescriptor;
    }

    setColumnConfigs(columnConfigs) {
        this.columnConfigs = columnConfigs;
    }

    setKeyColumnConfig(keyColumnConfig) {
        this.keyColumnConfig = keyColumnConfig;
    }

    getColumnConfigs() {
        return this.columnConfigs;
    }

    setStripRow(stripRow) {
        this.stripRow = stripRow;
    }

    getTable() {
        return this.table;
    }

    getSelectClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].Select);
    }

    getHoverClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].Hover);
    }

    getTableClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].Table);
    }

    getHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].Header);
    }

    getStripClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].Strip);
    }

    getTDClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].TD);
    }

    getTRClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].TR);
    }

    getBaseText() {
        return RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.GeneratorStyle.BaseText)[0];
    }
}
