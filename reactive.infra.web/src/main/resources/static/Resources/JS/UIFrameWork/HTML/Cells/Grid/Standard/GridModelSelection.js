import {BaseObservable} from "../../../../Shared/Event/BaseObservable.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {DOM} from "../../../../Shared/Common/DOM.js";

export class GridModelSelection extends BaseObservable {
    constructor() {
        super();
        this.setGridSelectionType(GridSelectionType.CellSelected);
    }

    bindEventToGrid(webGridAdvanced) {
        this.webGridAdvanced = webGridAdvanced;
        this.webGridAdvanced.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, webGridAdvanced.getElement(), this.onMouseClick.name, this);
        this.webGridAdvanced.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousemove, webGridAdvanced.getElement(), this.onMouseMove.name, this);
        this.webGridAdvanced.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseout, webGridAdvanced.getElement(), this.onMouseOut.name, this);
    }

    onMouseOut(event) {
        let targetElement = event.target;
        let hoverClassname = this.webGridAdvanced.getHoverClass();
        let compute = this.computeTargetElement(targetElement);

        DOM.removeClassName(compute.Target, hoverClassname);
    }

    onMouseMove(event) {
        let targetElement = event.target;
        let hoverClassname = this.webGridAdvanced.getHoverClass();
        let compute = this.computeTargetElement(targetElement);

        DOM.addClassName(compute.Target, hoverClassname, true);
    }

    onMouseClick(event) {
        let targetElement = event.target;
        let compute = this.computeTargetElement(targetElement);

        this.addSelect(this.isAdded(event), compute.Target, compute.Row, compute.Col);
    }

    isAdded(event) {
        return event.ctrlKey;
    }

    computeTargetElement(targetElement) {
        let col, row, cellTarget, rowTarget;
        if (targetElement.tagName === 'TD') {
            rowTarget = targetElement.parentElement
            col = targetElement.cellIndex;
            row = rowTarget.rowIndex;
            cellTarget = targetElement;
        }
        if (this.gridselectiontype !== undefined && this.gridselectiontype === GridSelectionType.CellSelected) {
            return {
                Target: cellTarget,
                Row: row,
                Col: col
            }
        } else if (this.gridselectiontype !== undefined && this.gridselectiontype === GridSelectionType.RowSelected) {
            return {
                Target: rowTarget,
                Row: row,
                Col: undefined
            }
        }
    }

    addSelect(isAdded, target, rowIndex, colIndex) {
        let selectClassname = this.webGridAdvanced.getSelectClass();

        if (!this.selectStack)
            this.selectStack = new Map();

        let targetModel;

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

        if (targetModel !== undefined) {
            if (!isAdded) {
                this.removeOld();
            }

            DOM.addClassName(target, selectClassname);
            this.selectStack.set(targetModel.KeyMap.toString(), targetModel);
            this.fireEvent(GridSelectionEvents.Selection.ChangeSelection);
        }
    }

    removeOld() {
        let that = this;
        this.selectStack.forEach((value, key) => {
            that.removeSelect(value.Target, key);
        })
    }

    removeSelect(targetElement, targetModel) {
        let selectClassname = this.webGridAdvanced.getSelectClass();

        this.selectStack.delete(targetModel);
        DOM.removeClassName(targetElement, selectClassname);
    }

    getSelect() {
        return this.selectStack;
    }

    setGridSelectionType(gridSelectionType) {
        this.gridselectiontype = gridSelectionType;
    }
}

export const GridSelectionType = {
    CellSelected: 'CellSelected',
    RowSelected: 'RowSelected'
};

export const GridSelectionEvents = {
    Selection: {
        ChangeSelection: 'ChangeSelection',
    }
};