import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {ButtonHeader} from "./ButtonHeader.js";

export class ColumnHeader extends HTMLComponent {
    constructor() {
        super();

        this.setElement(document.createElement('thead'));

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.onMouseClick.name, this);
        this.requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mousemove, this.onMouseMoveWindow.name, this);

        this.mapElementColumnConfig = new Map();
        this.buttonHeader = new Map();
    }

    onMouseClick(event) {
        let columnConfig = this.findColumnConfig(event.target);
        if (columnConfig)
            console.log(columnConfig.getDisplay());
    }

    onMouseMoveWindow(event) {
        let columnConfig = this.findColumnConfig(event.target);
        let findColumnConfigButtonHeader = this.isButtonHeaderElement(event.target);
        if (!findColumnConfigButtonHeader) {
            if (this.currentColumnConfig !== columnConfig) {
                this.visibleButtons(event.target, this.currentColumnConfig, false);
                this.currentColumnConfig = undefined;
            }
            if (columnConfig) {
                this.currentColumnConfig = columnConfig;
                this.visibleButtons(event.target, columnConfig, true);
            }
        }
    }

    visibleButtons(parentElement, columnConfig, visible) {
        if (columnConfig) {
            let button = this.buttonHeader.get(columnConfig);
            if (visible) {
                if (button === undefined) {
                    button = new ButtonHeader();
                    button.setParent(this);

                    this.buttonHeader.set(columnConfig, button);
                }
                button.onAttach(parentElement);
            } else if (!visible && button && button.getAttached()) {
                button.onDetach();
            }
        }
    }

    findColumnConfig(targetElement) {
        let columnConfig = this.mapElementColumnConfig.get(targetElement);
        if (columnConfig)
            return columnConfig;
        for (let index = 0; index < this.getElement().childElementCount; index++) {
            columnConfig = this.columnConfigs[index];
            let node = this.getElement().childNodes[index];
            this.mapElementColumnConfig.set(node, columnConfig);
            if (node === targetElement) {
                return columnConfig;
            }
        }
    }

    isButtonHeaderElement(element) {
        let isButtonElement = false;
        let findColumnConfig = null;
        this.buttonHeader.forEach((button, columnConfig) => {
            if (button.getElement() === element) {
                isButtonElement = true;
                findColumnConfig = columnConfig;
            }
        });
        return findColumnConfig;
    }

    setHeaderClass(headerClass) {
        this.headerClass = headerClass;
        this.getElement().setAttribute('class', headerClass);
    }

    setBaseTextClass(baseTextClass) {
        this.baseTextClass = baseTextClass;
    }

    setColumnConfigs(columnConfigs, attributeHeader) {
        this.columnConfigs = columnConfigs;
        DOM.removeChildNodes(this.getElement());
        for (let colIndex = 0; colIndex < columnConfigs.length; colIndex++) {
            let colConfig = columnConfigs[colIndex];
            if (!this.getParent().isValidColumnConfig(colConfig)) {
                continue;
            }
            let th = document.createElement('th');
            th.setAttribute('class', this.headerClass + ' ' + this.baseTextClass);
            th.innerHTML = colConfig.displayModel;

            if (attributeHeader !== undefined) {
                attributeHeader(colConfig, th);
            }

            this.getElement().appendChild(th);
        }
    }
}
