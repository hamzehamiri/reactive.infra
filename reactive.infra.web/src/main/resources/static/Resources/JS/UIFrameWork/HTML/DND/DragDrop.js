import {BaseObservable} from "../../Shared/Event/BaseObservable.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {DragDropSource} from "./DragDropSource.js";
import {DragDropEvent} from "./DragDropEvent.js";

export class DragDrop extends BaseObservable {

    constructor() {
        super();
        this.dragComponents = new Map();
        this.dropComponents = new Map();
    }

    addDrag(dragDropSource) {
        let that = this;
        if (dragDropSource instanceof DragDropSource) {
            this.dragComponents.set(dragDropSource.getComponent().getUUID(), dragDropSource);

            dragDropSource.commandComponentDragEvent(true);
            dragDropSource.addListener(EventFrameWork.event.Components.Drag.StartDrag, (dragDropEvent) => {
                if (dragDropEvent instanceof DragDropEvent) {
                    if (dragDropEvent.getSource() instanceof DragDropSource) {
                        that.dragSource = dragDropEvent.getSource();
                    }
                }
            });

            if (!this.startCaptureWindowEvent) {
                dragDropSource.getComponent().requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mousemove, this.onMouseMoveWindow.name, this);
                dragDropSource.getComponent().requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mouseup, this.onMouseUpWindow.name, this);
                this.startCaptureWindowEvent = true;
            }
        }
    }

    addDrop(dragDropSource) {
        let that = this;
        if (dragDropSource instanceof DragDropSource) {
            this.dropComponents.set(dragDropSource.getComponent().getUUID(), dragDropSource);
            dragDropSource.commandComponentDropEvent(true, (dragDropSourceEvent) => {
                if (that.dragSource) {
                    let dropTarget = dragDropSourceEvent.getSource();
                    dropTarget.highlighted(true);
                    that.dropTarget = dropTarget;
                }
            }, (dragDropSourceEvent) => {
                let dropTarget = dragDropSourceEvent.getSource();
                dropTarget.highlighted(false);
                that.dropTarget = null;
            }, (dragDropSourceEvent) => {
                if (that.dragSource) {
                    that.dropTarget.addItemReadyToDrop(that.dragSource.getItemReadyToDrag());
                    that.dropTarget.highlighted(false);
                    that.onMouseUpWindow();
                }
            });
        }
    }

    start() {
    }

    stop() {
        if (this.dropTarget) {
            this.dropTarget.highlighted(false);
            this.dropTarget = null;
        }
        if (this.dragSource) {
            this.dragSource = null;
        }
    }

    onMouseMoveWindow(event) {
        if (this.dragSource && this.dragSource.fireLeaveActive) {
            this.dragSource.tooltipUnderMouse(event);
        }
    }

    onMouseUpWindow(event) {
        if (this.dragSource) {
            this.dragSource.commandComponentReset();
        }
        this.dragSource = null;
    }
}