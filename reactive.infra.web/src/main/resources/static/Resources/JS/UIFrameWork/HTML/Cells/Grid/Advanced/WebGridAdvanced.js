import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import BodyTableHtmlRender from "./TableHtmlRender/BodyTableHtmlRender.js";
import HeaderTableHtmlRender from "./TableHtmlRender/HeaderTableHtmlRender.js";
import WebGridAdvancedColumnDragComponent from "./Dragger/WebGridAdvancedColumnDragComponent.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import WebGridAdvancedDragColumnEvent from "./Dragger/WebGridAdvancedDragColumnEvent.js";
import {WebColumnConfig} from "../Standard/WebColumnConfig.js";
import WebGridAdvancedColumnDragLayout from "./Dragger/WebGridAdvancedColumnDragLayout.js";
import WebGridAdvancedSelectionHandler from "./WebGridAdvancedSelectionHandler.js";
import {GridUtil} from "./GridUtil.js";
import GridSelectionEvent from "./GridSelectionEvent.js";
import AdvancedMenu from "../../Tree/AdvancedTree/Menu/AdvancedMenu.js";
import HTMLContainer from "../../../Container/HTMLContainer.js";

export default class WebGridAdvanced extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new WebGridAdvancedColumnDragLayout(this));
        this.setScrollType(HTMLComponent.ScrollType.Auto);
        this.bindTheme();

        this.bezier = DOM.createElement('div');

        this.header = new HeaderTableHtmlRender(this);
        this.body = new BodyTableHtmlRender(this);
        this.gridModelSelection = new WebGridAdvancedSelectionHandler(this);
        this.gridModelSelection.setSelectionMode(WebGridAdvancedSelectionHandler.Element.WebGridAdvancedSelectionType.RowSelected);
        this.gridModelSelection.setWebGridAdvancedEditorMode(WebGridAdvancedSelectionHandler.Element.WebGridAdvancedEditorMode.CellEditor);
        this.gridModelSelection.addListener(EventFrameWork.event.Components.WebGridAdvanced.SelectionChange, (gridSelectionEvent) => {
            if (gridSelectionEvent instanceof GridSelectionEvent) {
                let tdOrTr = gridSelectionEvent.getTargetModel().Target;
                this.bindBezierComponent(tdOrTr);
            }
        }, this);

        this.columnConfigs = new Map();
        this.columnConfigsByFieldId = new Map();
        this.columnConfigPk = new Map();
        this.columnConfigPkByFieldId = new Map();
        this.packDataRecived = [];
        this.recordByRecordPkMap = new Map();
        this.recordPkByRowIndexMap = new Map();

        this.headerDiv = DOM.createElement("div");
        this.bodyDiv = DOM.createElement("div");

        this.masterDiv = DOM.createElement("div");
        this.masterDiv.appendChild(this.headerDiv);
        this.masterDiv.appendChild(this.bodyDiv);

        this.setElement(this.masterDiv);

        this.setContextMenu(new AdvancedMenu());
        this.setAutoWidth(true);
    }

    bindBezierComponent(tdOrTr) {
        tdOrTr.appendChild(this.bezier);
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.StandardGrid[0]));
    }

    updateTranslateColumnConfig(columnConfig) {
        this.header.updateTranslateColumnConfig(columnConfig);
    }

    setAutoWidth(autoWidth) {
        this.autoWidth = autoWidth;
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.headerDiv, this.getHeaderDivClass());
        DOM.addClassName(this.bodyDiv, this.getBodyDivClass());
        DOM.addClassName(this.bezier, this.getStandardGridBezierClass());

        this.header.setParent(this);
        this.header.onAttach(this.headerDiv);
        this.header.setTableHeaderClass(this.getTableHeaderClass());
        this.header.setBaseTextClass(this.getBaseText());
        this.header.setTableHeaderTrClass(this.getTableHeaderTrClass());

        this.body.setParent(this);
        this.body.onAttach(this.bodyDiv);
        this.body.setTableBodyClass(this.getTableBodyClass());
        this.body.setBaseTextClass(this.getBaseText());

        this.renderHeader(this.columnConfigs);
        this.renderRecords(this.packDataRecived.pop());
    }

    onDetach() {
        super.onDetach();
        this.header.onDetach();
        this.body.onDetach();
    }

    sortColumnConfigs() {
        this.columnConfigByColumnIndexSortedMap = GridUtil.startSortColumnConfig(this.columnConfigs);
        this.columnConfigPkByColumnIndexSortedMap = GridUtil.startSortColumnConfig(this.columnConfigPk);
    }

    getColumnConfigPk() {
        return this.columnConfigPk;
    }

    getColumnConfigPkByFieldId() {
        return this.columnConfigPkByFieldId;
    }

    getColumnConfigMap() {
        return this.columnConfigs;
    }

    getColumnConfigByFieldMap() {
        return this.columnConfigsByFieldId;
    }

    setSize(width, height) {
        super.setSize(width, height);
        DOM.setHeight(this.bodyDiv, height - 48);
    }

    setStripRow(stripRow) {
        this.stripRow = stripRow;
    }

    setWebGridAdvancedCellRender(webGridAdvancedCellRender) {
        this.webGridAdvancedCellRender = webGridAdvancedCellRender;
    }

    setRecordDescriptorForCell(recordDescriptorForCell) {
        this.recordDescriptorForCell = recordDescriptorForCell;
    }

    setRecordDescriptorForPk(recordDescriptorForPk) {
        this.recordDescriptorForPk = recordDescriptorForPk;
    }

    setWebGridAdvancedEditorProvider(webGridAdvancedEditorProvider) {
        this.webGridAdvancedEditorProvider = webGridAdvancedEditorProvider;
    }

    setBodyCellChangeDetector(bodyCellChangeDetectorConsumer) {
        this.bodyCellChangeDetectorConsumer = bodyCellChangeDetectorConsumer;
    }

    getWebGridAdvancedEditorProvider() {
        return this.webGridAdvancedEditorProvider;
    }

    addRecords(arrayRecord) {
        if (this.getAttached()) {
            this.renderRecords(arrayRecord);
        } else {
            this.packDataRecived.push(arrayRecord);
        }
    }

    rerenderHeader(columnConfigs) {
        DOM.removeChildNodes(this.header.tbody);
        this.header.generateTrFirst = false;
        this.renderHeader(columnConfigs);
    }

    renderHeader(columnConfigs) {
        if (columnConfigs) {
            this.header.renderColumnConfig(columnConfigs);
        }
    }

    renderRecords(arrayRecord) {
        if (arrayRecord) {
            this.body.renderRecords(arrayRecord);
            this.generateColumnResizer();
        }
    }

    renderRecordWithIndex(record, index) {
        this.body.renderRecordWithIndex(record, index);
        this.generateColumnResizer();
    }

    generateColumnResizer() {
        let that = this;
        this.clearItems();

        this.body.getColumnBodyTDs().forEach((tds, columnIndex) => {
            let colConfig = that.columnConfigByColumnIndexSortedMap.get(columnIndex);

            if (that.autoWidth) {
                that.setColumnConfigWith(colConfig, colConfig.getFixWidth());
            }

            let resizer = new WebGridAdvancedColumnDragComponent(tds, colConfig, that);
            resizer.addListener(EventFrameWork.event.MouseEvent.mouseup, this.onPositionDragEnd, that);
            that.addItem(resizer)
        });

    }

    onPositionDragComponent(event) {
        if (event instanceof WebGridAdvancedDragColumnEvent) {
            let columnDragComponent = event.getColumnDragComponent();
            let width = columnDragComponent.getColumnConfig().getFixWidth() + event.getDx() + this.getElement().scrollLeft;

            this.updateColumnDragComponent(columnDragComponent, width);

            let totalWidthTable = this.getTotalWidthColumns();
            DOM.addStyleAttribute(this.body.table, 'width', "width : " + totalWidthTable + "px");
        }
    }

    updateColumnDragComponent(columnDragComponent, width) {
        let colConfig = columnDragComponent.getColumnConfig();
        colConfig.setFixWidth(width);

        columnDragComponent.getTdList().forEach((td) => {
            let styleTD = WebColumnConfig.generateStyleTD(colConfig);
            td.setAttribute('style', styleTD);
        });

        this.setColumnConfigWith(colConfig, width);
    }

    setColumnConfigWith(columnConfig, width) {
        if (this.body.totalWidthTable.tdGenerated) {
            let tdFirstBody = this.body.totalWidthTable.tdGenerated.get(columnConfig.getSortColumnIndex());
            DOM.setWidth(tdFirstBody, width);
        }
        if (this.header.totalWidthTable.tdGenerated) {
            let tdFirstHeader = this.header.totalWidthTable.tdGenerated.get(columnConfig.getSortColumnIndex());
            DOM.setWidth(tdFirstHeader, width);
        }
    }

    onPositionDragEnd(event) {
        this.onPositionDragComponent(event);
        this.layoutExecute();
    }

    isValidColumnConfig(columnConfig) {
        return true;
    }

    getTotalWidthColumns() {
        let totalWidth = 0;
        let trGenerate = DOM.createElement("tr");
        DOM.addClassName(trGenerate, this.getTrFirstRowClass());
        let tdMapColumn = new Map();
        this.columnConfigs.forEach(col => {
            let tdGenerate = DOM.createElement("td");
            DOM.setWidth(tdGenerate, col.getFixWidth());
            DOM.addClassName(tdGenerate, this.getTdFirstRowClass());

            tdMapColumn.set(col.getSortColumnIndex(), tdGenerate);

            totalWidth += col.getFixWidth();
            trGenerate.appendChild(tdGenerate);
        });
        return {
            totalWidth: totalWidth, trGenerate: trGenerate, tdGenerated: tdMapColumn
        };
    }

    findRecordByRowIndex(rowIndex) {
        let pkRecord = this.recordPkByRowIndexMap.get(rowIndex);
        return pkRecord ? this.body.findRecordByPK(pkRecord) : null;
    }

    updateValue_RenderTableElementMapWithRecords_ByRecordIdAndColumnId(targetRecord, coreWindowTabField, valueChangedModel) {
        let recordPk = this.recordDescriptorForPk(targetRecord, this);
        let columnConfig = this.columnConfigsByFieldId.get(coreWindowTabField.getId());
        let originalRecord = this.recordByRecordPkMap.get(recordPk);
        originalRecord.getRecordModelDTO().getFieldValues().set(coreWindowTabField.getId(), valueChangedModel);
        originalRecord.getRecordModelDTO().addFieldChanges(coreWindowTabField.getId(), valueChangedModel);

        let trModel = this.body.findRecordAndTRByPK(recordPk);
        if (trModel) {
            this.body.cellGenerate(columnConfig.getSortColumnIndex(), columnConfig, originalRecord, trModel.TrElement, trModel, true);
        }
    }

    clearRecords() {
        this.body.clearRecords();
        this.generateColumnResizer();
    }

    getGridModelSelection() {
        return this.gridModelSelection;
    }

    getSelectClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridSelect);
    }

    getTrFirstRowClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTrFirstRow);
    }

    getTdFirstRowClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTdFirstRow);
    }

    getHoverClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridHover);
    }

    getTableHeaderClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableHeader);
    }

    getTableHeaderTrClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableHeaderTr);
    }

    getTableBodyClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableBody);
    }

    getStripClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridStrip);
    }

    getTDBodyClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTDBody);
    }

    getTRBodyClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTRBody);
    }

    getBaseText() {
        return RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.GeneratorStyle.BaseText)[0];
    }

    getHeaderDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridHeaderDiv);
    }

    getBodyChangeDetectorCellClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBodyChangeDetectorCell);
    }

    getStandardGridTDPLabelBodyClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTDPLabelBody);
    }

    getBodyDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBodyDiv);
    }

    getStandardGridBezierClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBezier);
    }
}