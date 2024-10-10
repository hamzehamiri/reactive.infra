import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import DragEvent from "./DragEvent.js";
import {HTMLComponent} from "../Component/HTMLComponent.js";
import {DOM} from "../../Shared/Common/DOM.js";

export class Drag {
    constructor(dragSourceComponent, dragMode, mateSizeComponent, targetElementDrag) {
        this.dragSourceComponent = dragSourceComponent;
        this.dragElementMatcherFunctionArray = [];
        this.mateSizeComponent = mateSizeComponent;
        this.targetElementDrag = targetElementDrag;
        this.setDragMode(dragMode);
        if (this.dragSourceComponent.getAttached()) {
            this.bindComponent(this.dragSourceComponent);
        } else {
            this.dragSourceComponent.addListener(EventFrameWork.event.Components.BaseComponent.OnAfterLoad, () => {
                this.bindComponent(this.dragSourceComponent);
            }, this);
        }
    }

    addDragElementMatcherFunction(dragElementMatcherFunction) {
        this.dragElementMatcherFunctionArray.push(dragElementMatcherFunction);
    }

    setDragMode(dragMode) {
        this.dragMode = dragMode;
    }

    bindComponent(dragSourceComponent) {
        dragSourceComponent.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousedown, this.targetElementDrag ? this.targetElementDrag : dragSourceComponent.getElement(), this.onMouseDown.name, this);
        if (dragSourceComponent instanceof HTMLComponent) {
            dragSourceComponent.addListener(EventFrameWork.event.Components.BaseComponent.OnDetach, (baseEvent) => {
                this.stopDrag();
            });
        }
    }

    bindWindowEvent(dragSourceComponent) {
        dragSourceComponent.requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mouseup, this.onMouseUp.name, this);
        dragSourceComponent.requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mousemove, this.onMouseMove.name, this);
    }

    unBindWindowEvent(dragSourceComponent) {
        dragSourceComponent.unRegisterWindowEvent(EventFrameWork.event.MouseEvent.mouseup);
        dragSourceComponent.unRegisterWindowEvent(EventFrameWork.event.MouseEvent.mousemove);
    }

    onMouseMove(event) {
        if (this.mouseDown) {
            event.preventDefault();
            if (this.mouseDownPosition) {
                let dragEvent = this.createDragEventMouse(event, this.mouseDownPosition);
                if (this.targetElementDrag) {
                    DOM.setLeft(this.targetElementDrag, dragEvent.xFinal);
                } else {
                    this.dragSourceComponent.setPosition(dragEvent.xFinal, dragEvent.yFinal, false);
                }
                this.dragSourceComponent.fireEvent(EventFrameWork.event.position, dragEvent.dragEvent);

                this.mouseDownPosition = event;
            }
        }
    }

    createDragEventMouse(newEvent, eventLast) {
        let rec;
        if (this.targetElementDrag) {
            rec = DOM.getBoundingClientRect_Style(this.targetElementDrag);
        } else {
            rec = this.dragSourceComponent.getBoundingClientRect_Style();
        }

        let mouse_old_x = eventLast.clientX;
        let mouse_old_y = eventLast.clientY;
        let mouse_new_x = newEvent.clientX;
        let mouse_new_y = newEvent.clientY;

        let dX = mouse_new_x - mouse_old_x;
        let dY = mouse_new_y - mouse_old_y;

        let currentX = RegisterComponent.getCurrentLanguage().getIsRTL() ? rec.left : rec.left;
        let currentY = rec.top;

        let xFinal, yFinal;
        let dragEvent;

        if (this.dragMode) {
            switch (this.dragMode) {
                case Drag.DragMode.Horizontal :
                    xFinal = RegisterComponent.getCurrentLanguage().getIsRTL() ? currentX + dX : currentX + dX;
                    yFinal = currentY;
                    dragEvent = new DragEvent(this.dragSourceComponent, dX);
                    break;
                case Drag.DragMode.Vertical :
                    xFinal = currentX;
                    yFinal = currentY + dY;
                    dragEvent = new DragEvent(this.dragSourceComponent, dY);
                    break;
                case Drag.DragMode.Both :
                    xFinal = RegisterComponent.getCurrentLanguage().getIsRTL() ? currentX + dX : currentX + dX;
                    yFinal = currentY + dY;
                    dragEvent = new DragEvent(this.dragSourceComponent, null, dX, dY);
                    break;
            }
            dragEvent.setMateSizeComponent(this.mateSizeComponent);
        } else {
            xFinal = RegisterComponent.getCurrentLanguage().getIsRTL() ? currentX + dX : currentX + dX;
            yFinal = currentY + dY;
        }
        if (dragEvent) {
            dragEvent.setXFinal(xFinal);
            dragEvent.setYFinal(yFinal);
        }
        return {
            dragEvent,
            xFinal,
            yFinal
        };
    }

    onMouseDown(event) {
        this.mouseDown = true;
        this.mouseDownPosition = event;
        this.mouseDownPositionStart = event;
        if (this.dragElementMatcherFunctionArray.length > 0) {
            for (let dragElementMatcherFunction of this.dragElementMatcherFunctionArray) {
                if (dragElementMatcherFunction(event)) {
                    this.bindWindowEvent(this.dragSourceComponent);
                }
            }
        } else {
            this.bindWindowEvent(this.dragSourceComponent);
        }
    }

    onMouseUp(event) {
        if (this.mouseDown) {
            let dragEvent = this.createDragEventMouse(event, this.mouseDownPositionStart);
            this.mouseDown = false;
            this.mouseDownPosition = null;
            this.mouseDownPositionStart = null;
            this.dragSourceComponent.fireEvent(EventFrameWork.event.positionEnd, dragEvent.dragEvent);

            this.unBindWindowEvent(this.dragSourceComponent);
        }
    }

    stopDrag() {
        delete this.mouseDown;
        delete this.mouseDownPosition;
        delete this.mouseDownPositionStart;
        this.unBindWindowEvent(this.dragSourceComponent);
    }
}

Drag.DragMode = {
    Horizontal: "Horizontal",
    Vertical: "Vertical",
    Both: "Both"
}