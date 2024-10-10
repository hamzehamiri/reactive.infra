import {EventFrameWork} from "../../../../../Shared/Event/EventFrameWork.js";
import {DOM} from "../../../../../Shared/Common/DOM.js";
import TableHtmlRender from "./TableHtmlRender.js";
import {ButtonHeaderAdvanced, ButtonHeaderAdvancedKeys} from "../ButtonHeaderAdvanced.js";
import FormEngineEventFrameWork from "../../../../../../ERPFrameWork/Modules/FormEngine/Events/FormEngineEventFrameWork.js";
import ButtonEditorEvent from "../../../../WebEditor/Common/ButtonEditorEvent.js";

export default class HeaderTableHtmlRender extends TableHtmlRender {
    constructor(advancedGrid) {
        super(advancedGrid);

        this.tr = DOM.createElement('tr');

        this.columnConfigsWithElementMap = new Map();
        this.columnElementByModelMap = new Map();
        this.buttonHeader = new Map();
    }

    renderColumnConfig(columnConfigs, attributeHeader) {
        if (columnConfigs) {
            if (this.getAttached()) {
                this.generateFirstTr();
                if (this.generateTrFirst) {
                    this.tbody.appendChild(this.tr);
                }
                let lastColumnConfigModel;

                columnConfigs.forEach((columnConfig) => {
                    let dataElement = this.columnConfigsWithElementMap.get(columnConfig.getSortColumnIndex());

                    if (!dataElement) {
                        let tdElement = this.renderCell(columnConfig);
                        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseleave, tdElement, this.onMouseLeave.name, this);
                        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseenter, tdElement, this.onMouseEnter.name, this);

                        dataElement = {
                            columnConfigModel: columnConfig,
                            cellElement: tdElement,
                            addToHtml: false
                        };

                        this.columnConfigsWithElementMap.set(columnConfig.getSortColumnIndex(), dataElement);

                        if (this.advancedGrid.isValidColumnConfig(dataElement.columnConfigModel)) {
                            if (!dataElement.addToHtml) {
                                if (lastColumnConfigModel) {
                                    lastColumnConfigModel.cellElement.after(dataElement.cellElement);
                                    dataElement.addToHtml = true;
                                } else {
                                    this.tr.appendChild(dataElement.cellElement);
                                    dataElement.addToHtml = true;
                                }
                                this.columnElementByModelMap.set(dataElement.cellElement, dataElement);
                            }
                        }
                        lastColumnConfigModel = dataElement;
                    }
                })
            }
        }
    }

    updateTranslateColumnConfig(columnConfig) {
        let dataElement = this.columnConfigsWithElementMap.get(columnConfig.getSortColumnIndex());
        if (dataElement) {
            this.updateCell(dataElement.cellElement, columnConfig);
        }
    }

    renderCell(columnConfig) {
        let td = DOM.createElement('td');
        DOM.addClassName(td, this.advancedGrid.getTDBodyClass());
        DOM.addClassName(td, this.baseTextClass);
        this.updateCell(td, columnConfig);
        return td;
    }

    updateCell(td, columnConfig) {
        td.innerHTML = columnConfig.displayModel;
    }

    onMouseLeave(event) {
        let model = this.columnElementByModelMap.get(event.target);
        if (model) {
            let button = this.buttonHeader.get(model.cellElement);
            if (button && button.getAttached()) {
                button.onDetach();
            }
        }
    }

    getHeight() {
        return DOM.getCompute_Height(this.element);
    }

    onMouseEnter(event) {
        let dataElement = this.columnElementByModelMap.get(event.target);
        if (dataElement) {
            let button = this.buttonHeader.get(dataElement.cellElement);
            if (!button) {
                button = new ButtonHeaderAdvanced();
                button.addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, (buttonEditorEvent) => {

                    this.advancedGrid.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, buttonEditorEvent);
                });
                button.setParent(this);
                this.buttonHeader.set(dataElement.cellElement, button);
            }
            let boundingClientRect = DOM.getBoundingClientRect(dataElement.cellElement);
            button.onAttach(dataElement.cellElement);
            button.setWidth(boundingClientRect.width);
            button.setHeight(boundingClientRect.height);
            button.setModelColumnConfig(dataElement);
            button.layoutExecute();
        }
    }

    setTableHeaderClass(tableHeaderClass) {
        this.tableHeaderClass = tableHeaderClass;
        if (this.getAttached()) {
            this.getElement().setAttribute('class', tableHeaderClass);
        }
    }

    setTableHeaderTrClass(tableHeaderTrClass) {
        this.tableHeaderTrClass = tableHeaderTrClass;
        if (this.getAttached()) {
            this.tr.setAttribute('class', tableHeaderTrClass);
        }
    }

    setBaseTextClass(baseTextClass) {
        this.baseTextClass = baseTextClass;
    }
}