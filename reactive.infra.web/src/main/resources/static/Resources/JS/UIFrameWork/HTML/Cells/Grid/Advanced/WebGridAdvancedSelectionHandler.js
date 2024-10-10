import {BaseObservable} from "../../../../Shared/Event/BaseObservable.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import GridSelectionEvent from "./GridSelectionEvent.js";
import Stack from "../../../../Shared/Common/Stack.js";

export default class WebGridAdvancedSelectionHandler extends BaseObservable {

    constructor(webGridAdvanced) {
        super();
        this.webGridAdvanced = webGridAdvanced;
        this.selectRecordStack = new Stack();
        this.selectTargetStack = new Stack();
        if (this.webGridAdvanced.getAttached()) {
            this.bindEvent();
        } else {
            this.webGridAdvanced.addListener(EventFrameWork.event.Components.BaseComponent.OnAfterLoad, () => {
                this.bindEvent();
            }, this);
        }
    }

    bindEvent() {
        if (this.webGridAdvanced.getAttached()) {
            this.webGridAdvanced.body.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.dblclick, this.webGridAdvanced.body.getElement(), this.onMouseDbClick.name, this);
            this.webGridAdvanced.body.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.webGridAdvanced.body.getElement(), this.onMouseClick.name, this);
            this.webGridAdvanced.body.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousemove, this.webGridAdvanced.body.getElement(), this.onMouseMove.name, this);
            this.webGridAdvanced.body.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseout, this.webGridAdvanced.body.getElement(), this.onMouseOut.name, this);

            this.webGridAdvanced.body.requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mousedown, this.onMouseDown.name, this);
        }
    }

    onMouseDown(event) {
        if (this.webGridAdvanced.getWebGridAdvancedEditorProvider() && this.webGridAdvanced.getWebGridAdvancedEditorProvider().isStartEditing && !this.webGridAdvanced.body.getElement().contains(event.target) && !this.webGridAdvanced.getWebGridAdvancedEditorProvider().containOf(event.target)) {
            this.webGridAdvanced.getWebGridAdvancedEditorProvider().stopEditing();
        }
    }

    onMouseOut(event) {
        let hoverClassname = this.webGridAdvanced.getHoverClass();
        let compute = this.computeTargetElement(event);

        DOM.removeClassName(compute.Target, hoverClassname);
    }

    onMouseMove(event) {
        let hoverClassname = this.webGridAdvanced.getHoverClass();
        let compute = this.computeTargetElement(event);

        DOM.addClassName(compute.Target, hoverClassname, true);
    }

    onMouseClick(event) {
        let compute = this.computeTargetElement(event);
        let record = this.webGridAdvanced.findRecordByRowIndex(compute.Row)
        this.addSelect(this.isAdded(event), compute.Target, compute.Row, compute.Col, record);
    }

    onMouseDbClick(event) {
        if (this.webGridAdvanced.getWebGridAdvancedEditorProvider()) {
            let compute = this.computeTargetElement(event);

            if (compute.Target) {
                let record = this.webGridAdvanced.findRecordByRowIndex(compute.Row);
                this.webGridAdvanced.getWebGridAdvancedEditorProvider().startEditing(compute.Target, compute.Row, compute.Col + 1, record, this.webGridAdvanced, this.webGridAdvancedEditorMode);
            }
        }
    }

    setSelectionMode(webGridAdvancedSelectionType) {
        this.webGridAdvancedSelectionType = webGridAdvancedSelectionType;
    }

    setWebGridAdvancedEditorMode(webGridAdvancedEditorMode) {
        this.webGridAdvancedEditorMode = webGridAdvancedEditorMode;
    }

    resizing() {
        this.webGridAdvanced.getWebGridAdvancedEditorProvider().resizing();
    }

    isAdded(event) {
        return event.ctrlKey;
    }

    findTd(targetElement) {
        if (targetElement === this.webGridAdvanced.getElement()) {
            return null;
        } else if (targetElement.classList.contains(this.webGridAdvanced.getTDBodyClass())) {
            return targetElement;
        } else {
            return this.findTd(targetElement.parentElement);
        }
    }

    computeTargetElement(event) {
        let targetElement = event.target;
        let col, row, cellTarget, rowTarget;
        let tdElement = this.findTd(targetElement);
        if (tdElement) {
            rowTarget = tdElement.parentElement
            col = tdElement.cellIndex;
            row = rowTarget.rowIndex;
            cellTarget = tdElement;
        }
        let cellMode = false;
        if (this.webGridAdvancedEditorMode) {
            cellMode = this.webGridAdvancedEditorMode === WebGridAdvancedSelectionHandler.Element.WebGridAdvancedEditorMode.CellEditor;
        }

        if (this.webGridAdvancedSelectionType !== undefined) {
            return {
                Target: this.webGridAdvancedSelectionType === WebGridAdvancedSelectionHandler.Element.WebGridAdvancedSelectionType.CellSelected || cellMode ? cellTarget : rowTarget,
                Row: row,
                Col: this.webGridAdvancedSelectionType === WebGridAdvancedSelectionHandler.Element.WebGridAdvancedSelectionType.CellSelected || cellMode ? col : undefined
            }
        }
    }

    addSelect(isAdded, target, rowIndex, colIndex, record) {
        let selectClassname = this.webGridAdvanced.getSelectClass();

        let targetModel = null;

        if (rowIndex !== undefined && colIndex === undefined) {
            targetModel = {
                KeyMap: rowIndex,
                Target: target,
                Row: rowIndex,
                Col: undefined
            };
        } else if (rowIndex !== undefined && colIndex !== undefined) {
            targetModel = {
                KeyMap: [rowIndex, colIndex],
                Target: target,
                Row: rowIndex,
                Col: colIndex
            };
        }

        if (targetModel !== undefined && targetModel != null) {
            if (!isAdded) {
                this.removeOld();
            }

            DOM.addClassName(target, selectClassname);
            this.selectRecordStack.push(record);
            this.selectTargetStack.push(targetModel);
            this.fireEvent(EventFrameWork.event.Components.WebGridAdvanced.SelectionChange, new GridSelectionEvent(this.webGridAdvanced, this.selectStack, targetModel, record, isAdded));
        }
    }

    removeOld() {
        let that = this;
        this.selectRecordStack.forEach((value, key) => {
            that.selectRecordStack.removeIndexCount(key, 1);
        });
        this.selectTargetStack.forEach((value, key) => {
            that.removeSelect(value.Target, key);
        });
    }

    removeSelect(targetElement, key) {
        let selectClassname = this.webGridAdvanced.getSelectClass();

        this.selectTargetStack.removeIndexCount(key, 1);
        DOM.removeClassName(targetElement, selectClassname);
    }

    getSelectRecordStack() {
        return this.selectRecordStack;
    }

    getSelectTargetStack() {
        return this.selectTargetStack;
    }
}

WebGridAdvancedSelectionHandler.Element = {
    WebGridAdvancedSelectionType: {
        CellSelected: 'CellSelected',
        RowSelected: 'RowSelected'
    },
    WebGridAdvancedEditorMode: {
        CellEditor: 'cellEditor',
        RowInlineEditor: 'rowInlineEditor'
    }
}