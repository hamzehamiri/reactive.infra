import TableHtmlRender from "./TableHtmlRender.js";
import {DOM} from "../../../../../Shared/Common/DOM.js";
import {WebColumnConfig} from "../../Standard/WebColumnConfig.js";
import {Util} from "../../../../../Shared/Common/Util.js";
import {HTMLComponent} from "../../../../Component/HTMLComponent.js";

export default class BodyTableHtmlRender extends TableHtmlRender {
    constructor(advancedGrid) {
        super(advancedGrid);

        this.columnBodyTDs = new Map();
        this.trModelByRecordPkMap = new Map();
        this.odd = false;
        this.lastRowIndex = 1;
    }

    clearRecords() {
        this.advancedGrid.recordByRecordPkMap.clear();
        this.columnBodyTDs.clear();
        this.trModelByRecordPkMap.clear();
        this.odd = false;
        this.lastRowIndex = 1;
        this.generateTrFirst = false;
        DOM.removeChildNodes(this.tbody);
    }

    renderRecords(arrayRecord) {
        if (arrayRecord) {
            if (this.getAttached()) {
                this.generateFirstTr();
                if (arrayRecord instanceof Array) {
                    for (let index = 0; index < arrayRecord.length; index++) {
                        let recordModelDTO = arrayRecord[index];
                        this.renderOneRecord(recordModelDTO);
                    }
                } else {
                    this.renderOneRecord(arrayRecord);
                }
            }
        }
    }

    renderRecordWithIndex(record, index) {
        if (this.getAttached()) {
            this.generateFirstTr();

            let recordPk = this.advancedGrid.recordDescriptorForPk(record, this.advancedGrid);
            this.advancedGrid.recordByRecordPkMap.set(recordPk, record);

            let newRecordPkByRowIndexMap = new Map();
            this.odd = false;
            this.lastRowIndex = 1;
            for (let rowIndex = 0; rowIndex < this.advancedGrid.recordPkByRowIndexMap.size + 1; rowIndex++) {
                if (this.lastRowIndex < index) {
                    newRecordPkByRowIndexMap.set(this.lastRowIndex, this.advancedGrid.recordPkByRowIndexMap.get(this.lastRowIndex));
                } else if (this.lastRowIndex === index) {
                    newRecordPkByRowIndexMap.set(this.lastRowIndex, recordPk);

                    let tr = this.tbody.insertRow(index);
                    DOM.addClassName(tr, this.advancedGrid.getTRBodyClass());

                    let trModel = {
                        Record: record,
                        TdElementAndValueMap: new Map(),
                        TrElement: tr
                    }

                    this.trModelByRecordPkMap.set(recordPk, trModel);

                    this.advancedGrid.columnConfigByColumnIndexSortedMap.forEach((columnConfig) => {
                        this.cellGenerate(columnConfig.getSortColumnIndex(), columnConfig, record, tr, trModel, false);
                    });
                } else {
                    let recordPk_RefactorNode = this.advancedGrid.recordPkByRowIndexMap.get(this.lastRowIndex - 1);
                    newRecordPkByRowIndexMap.set(this.lastRowIndex, recordPk_RefactorNode);

                    let trModel = this.trModelByRecordPkMap.get(recordPk_RefactorNode);

                    DOM.removeClassName(trModel.TrElement, this.advancedGrid.getStripClass());
                    if (this.advancedGrid.stripRow && this.odd) {
                        DOM.addClassName(trModel.TrElement, this.advancedGrid.getStripClass());
                    }
                }
                this.odd = !this.odd;
                this.lastRowIndex++;
            }

            delete this.advancedGrid.recordPkByRowIndexMap;
            this.advancedGrid.recordPkByRowIndexMap = newRecordPkByRowIndexMap;
        }
    }

    renderOneRecord(record) {
        let recordPk = this.advancedGrid.recordDescriptorForPk(record, this.advancedGrid);
        this.advancedGrid.recordByRecordPkMap.set(recordPk, record);

        let trModel = this.trModelByRecordPkMap.get(recordPk);
        if (trModel) {
            trModel.Record = record;
            this.renderRecord(record, null, trModel, true);
        } else {
            this.advancedGrid.recordPkByRowIndexMap.set(this.lastRowIndex, recordPk);

            let trModel = {
                Record: record,
                TdElementAndValueMap: new Map(),
                TrElement: null
            }

            let strip = this.advancedGrid.stripRow ? (this.odd ? this.advancedGrid.getStripClass() : '') : '';
            trModel.TrElement = this.renderRecord(record, strip, trModel, false);

            this.trModelByRecordPkMap.set(recordPk, trModel);
            this.lastRowIndex++;
        }
    }

    renderRecord(record, strip, trModel, checkCache) {
        let tr = null;
        if (checkCache) {
            tr = trModel.TrElement;
        } else {
            tr = DOM.createElement('tr');
            DOM.addClassName(tr, this.advancedGrid.getTRBodyClass());
            if (strip.length > 0)
                DOM.addClassName(tr, strip);

            this.tbody.appendChild(tr);
            this.odd = !this.odd;
        }

        this.advancedGrid.columnConfigByColumnIndexSortedMap.forEach((columnConfig) => {
            this.cellGenerate(columnConfig.getSortColumnIndex(), columnConfig, record, tr, trModel, checkCache);
        });
        return tr;
    }

    cellGenerate(colIndex, colConfig, record, tr, trModel, checkCache) {
        let td = null;

        let cellHtmlRenderJson = this.advancedGrid.webGridAdvancedCellRender.renderHtmlGridCell(colIndex, colConfig, record, tr, trModel);

        if (checkCache) {
            td = trModel.TdElementAndValueMap.get(colConfig.getKeyForModelCell()).TdElement;
            td.innerHTML = '';
        } else {
            let styleTD = WebColumnConfig.generateStyleTD(colConfig);

            td = DOM.createElement('td');
            td.setAttribute('class', this.advancedGrid.getTDBodyClass() + ' ' + this.advancedGrid.getBaseText());
            td.setAttribute('style', styleTD);
            tr.appendChild(td);
            this.computeTd(colIndex, td);

            trModel.TdElementAndValueMap.set(colConfig.getKeyForModelCell(), {
                Record: cellHtmlRenderJson,
                TdElement: td
            });
        }

        if (cellHtmlRenderJson) {
            if (cellHtmlRenderJson.Render instanceof HTMLComponent) {
                cellHtmlRenderJson.Render.setParent(this);
                cellHtmlRenderJson.Render.onAttach(td);
                // cellHtmlRenderJson.Render.makePositionable(true);
            } else if (cellHtmlRenderJson.Render instanceof Element) {
                td.appendChild(cellHtmlRenderJson.Render);
            }

            if (this.advancedGrid.bodyCellChangeDetectorConsumer(record, colConfig)) {
                DOM.addClassName(td, this.advancedGrid.getBodyChangeDetectorCellClass());
            } else {
                DOM.removeClassName(td, this.advancedGrid.getBodyChangeDetectorCellClass());
            }

            if (this.advancedGrid.autoWidth) {
                let widthOfText = Util.getWithOfText(cellHtmlRenderJson.Value, DOM.getFontFamily(td), DOM.getFontSize(td));
                if (colConfig instanceof WebColumnConfig) {
                    colConfig.setFixWidth(Math.max(colConfig.getFixWidth(), widthOfText));
                }
            }
        }
    }

    renderCellValue(record, key) {
        let modelCellValue = this.advancedGrid.recordDescriptorForCell(record, key);
        return modelCellValue === undefined ? '' : modelCellValue;
    }

    computeTd(colIndex, td) {
        let tdsOld = this.columnBodyTDs.get(colIndex);
        if (tdsOld !== undefined) {
            tdsOld.push(td);
        } else {
            let tds = [];
            tds.push(td);
            this.columnBodyTDs.set(colIndex, tds);
        }
    }

    getColumnBodyTDs() {
        return this.columnBodyTDs;
    }

    setTableBodyClass(tableBodyClass) {
        this.tableBodyClass = tableBodyClass;
        if (this.getAttached()) {
            this.getElement().setAttribute('class', tableBodyClass);
        }
    }

    setBaseTextClass(baseTextClass) {
        this.baseTextClass = baseTextClass;
    }

    findRecordByPK(recordPk) {
        let trModel = this.trModelByRecordPkMap.get(recordPk);
        return trModel ? trModel.Record : null;
    }

    findRecordAndTRByPK(recordPk) {
        return this.trModelByRecordPkMap.get(recordPk);
    }
}