import BaseSharedComponent from "../BaseShared/BaseSharedComponent.js";
import {EventFrameWork} from "../Event/EventFrameWork.js";
import {BaseObservable} from "../Event/BaseObservable.js";
import BaseEvent from "../Event/BaseEvent.js";
import {ClientLogger, LogLevel} from "../Logger/ClientLogger.js";

export default class DragShare extends BaseObservable {
    constructor() {
        super();
        this.mapShiftViewPortComponent = new Map();
        this.mapSourceComponent = new Map();
        this.mapTargetComponent = new Map();
    }

    addShiftViewPort(baseSharedComponent, elementSource) {
        this.mapShiftViewPortComponent.set(baseSharedComponent.getUUID(), {
            BaseSharedComponent: baseSharedComponent,
            Element: elementSource,
        });
    }

    addSourceBaseSharedComponent(baseSharedComponent, elementSource, dragElementMatcherFunction, dropElementMatcherFunction) {
        this.mapSourceComponent.set(baseSharedComponent.getUUID(), {
            BaseSharedComponent: baseSharedComponent,
            Element: elementSource,
            DragElementMatcherFunction: dragElementMatcherFunction,
            DropElementMatcherFunction: dropElementMatcherFunction
        });
    }

    addTargetBaseSharedComponent(baseSharedComponent, elementSource, dropElementMatcherFunction) {
        this.mapTargetComponent.set(baseSharedComponent.getUUID(), {
            BaseSharedComponent: baseSharedComponent,
            Element: elementSource,
            DropElementMatcherFunction: dropElementMatcherFunction
        });
    }

    start() {
        let that = this;
        this.mapSourceComponent.forEach((sourceComponent) => {
            let baseSharedComponent = sourceComponent.BaseSharedComponent;
            let element = sourceComponent.Element;

            if (baseSharedComponent instanceof BaseSharedComponent) {
                baseSharedComponent.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousedown, element, (event) => {

                    that.mouseDown = true;
                    that.baseSharedComponent = baseSharedComponent;
                    that.mouseDownEventLast = event;
                    that.mouseDownEventStart = event;

                    let arrayObject = sourceComponent.DragElementMatcherFunction(event);
                    if (arrayObject && arrayObject.length > 0) {
                        that.arrayObject = arrayObject;
                        let baseEvent = new BaseEvent(baseSharedComponent);
                        baseEvent.setDataKey(DragShareKeys.DragShareKeyObjectSelected, arrayObject);

                        that.bindWindowEvent(baseSharedComponent);
                        that.fireEvent(EventFrameWork.event.DND.DNDStartDrag, baseEvent);
                    }
                }, this, true);
            }
        });
        this.mapShiftViewPortComponent.forEach((sourceComponent) => {
            let baseSharedComponent = sourceComponent.BaseSharedComponent;
            let element = sourceComponent.Element;
            if (baseSharedComponent instanceof BaseSharedComponent) {
                baseSharedComponent.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousedown, element, (event) => {
                    if (event.button === 2) {

                        that.mouseViewPort = true;
                        that.baseSharedComponent = baseSharedComponent;
                        that.mouseDownEventLast = event;
                        that.mouseDownEventStart = event;

                        let baseEvent = new BaseEvent(baseSharedComponent);

                        that.bindWindowEvent(baseSharedComponent);
                        that.fireEvent(EventFrameWork.event.DND.DNDStartDrag, baseEvent);
                    }
                });
            }
        })
    }

    createDragEventMouse(newEvent, beforeEvent) {
        let dX = newEvent.clientX - beforeEvent.clientX;
        let dY = newEvent.clientY - beforeEvent.clientY;

        return {
            dX,
            dY
        };
    }

    mouseMoveEvent(event) {
        if (this.mouseDown) {
            event.preventDefault();
            if (this.mouseDownEventLast) {
                let dragEvent = this.createDragEventMouse(event, this.mouseDownEventLast);
                this.mouseDownEventLast = event;
                let baseEvent = new BaseEvent(this.baseSharedComponent);
                baseEvent.setDataKey(DragShareKeys.DragShareKeyPositionChange, dragEvent);
                baseEvent.setDataKey(DragShareKeys.DragShareKeyObjectSelected, this.arrayObject);
                this.fireEvent(EventFrameWork.event.DND.DNDStartDraggingPosition, baseEvent);
            }
        } else if (this.mouseViewPort) {
            event.preventDefault();
            if (this.mouseDownEventLast) {
                let dragEvent = this.createDragEventMouse(event, this.mouseDownEventLast);
                this.mouseDownEventLast = event;
                let baseEvent = new BaseEvent(this.baseSharedComponent);
                baseEvent.setDataKey(DragShareKeys.DragShareKeyPositionChange, dragEvent);
                this.fireEvent(EventFrameWork.event.DND.DNDStartViewPortPosition, baseEvent);
            }
        }
    }

    mouseUpEvent(event) {
        this.unBindWindowEvent(this.baseSharedComponent);

        delete this.mouseDown;
        delete this.mouseViewPort;
        delete this.baseSharedComponent;
        delete this.mouseDownEventLast;
        delete this.mouseDownEventStart;
        delete this.arrayObject;
    }

    bindWindowEvent(baseSharedComponent) {
        if (baseSharedComponent) {
            baseSharedComponent.requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mouseup, this.mouseUpEvent.name, this);
            baseSharedComponent.requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mousemove, this.mouseMoveEvent.name, this);
        } else {
            ClientLogger.Log(LogLevel.Debug, "Null DragShare bindWindowEvent Object");
        }
    }

    unBindWindowEvent(baseSharedComponent) {
        if (baseSharedComponent) {
            baseSharedComponent.unRegisterWindowEvent(EventFrameWork.event.MouseEvent.mouseup);
            baseSharedComponent.unRegisterWindowEvent(EventFrameWork.event.MouseEvent.mousemove);
        } else {
            ClientLogger.Log(LogLevel.Debug, "Null DragShare unBindWindowEvent Object");
        }
    }

    stop() {

    }
}

export const DragShareType = {
    Horizontal: "Horizontal",
    Vertical: "Vertical",
    Both: "Both"
}

export const DragShareKeys = {
    DragShareKeyObjectSelected: 'DragShareKeyObjectSelected',
    DragShareKeyPositionChange: 'DragShareKeyPositionChange'
}

export const DragShareClickType = {
    RightClick: 'RightClick',
    LeftClick: 'LeftClick',
    MiddleClick: 'MiddleClick'
}