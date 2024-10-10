import {BaseObservable} from "../../Shared/Event/BaseObservable.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {HTMLComponent} from "../Component/HTMLComponent.js";
import {BodyElementWidget} from "../Widget/BodyElementWidget.js";
import {DragDropEvent} from "./DragDropEvent.js";
import {BaseHTMLComponent} from "../Component/BaseHTMLComponent.js";
import BaseEvent from "../../Shared/Event/BaseEvent.js";

export class DragDropSource extends BaseObservable {
    constructor(component) {
        super();
        this.component = component;
        this.fireLeaveActive = false;
    }

    createEvent(event) {
        return new DragDropEvent(this);
    }

    generateUIEventUnderMouse(event) {

    }

    onMouseDown(event) {
        this.mouseDownEvent = this.createEvent(event);
    }

    onMouseLeave(event) {
        if (this.mouseDownEvent && !this.fireLeaveActive) {
            this.fireEvent(EventFrameWork.event.Components.Drag.StartDrag, this.mouseDownEvent);
            this.fireLeaveActive = true;
        }
    }

    tooltipUnderMouse(event) {
        if (!this.widgetUnderMouse) {
            this.widgetUnderMouse = this.generateUIEventUnderMouse();
        }
        if (this.widgetUnderMouse && this.widgetUnderMouse instanceof HTMLComponent) {
            if (!this.widgetUnderMouse.getAttached()) {
                let body = BodyElementWidget.get();
                body.addItem(this.widgetUnderMouse);
                body.onAttach();
                body.layoutExecute();
            }
            this.widgetUnderMouse.makePositionable(true);
            this.widgetUnderMouse.setPosition(event.clientX, event.clientY + 20);
        }
    }

    commandBindComponentDragEvent(start) {
        if (start) {
            this.component.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mousedown, this.component.getElement(), this.onMouseDown.name, this);
            this.component.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseleave, this.component.getElement(), this.onMouseLeave.name, this);
        } else {
            this.component.unRegisterEvent(EventFrameWork.event.MouseEvent.mousedown, BaseHTMLComponent.EventType.DOM);
            this.component.unRegisterEvent(EventFrameWork.event.MouseEvent.mouseleave, BaseHTMLComponent.EventType.DOM);
        }
    }

    commandBindComponentDropEvent(start, mouseoverFunctionEvent, mouseoutFunctionEvent, mouseupFunctionEvent) {
        let that = this;
        if (start) {
            this.component.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseover, this.component.getElement(), (event) => {
                if (mouseoverFunctionEvent)
                    mouseoverFunctionEvent(new BaseEvent(that));
            }, this);
            this.component.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseout, this.component.getElement(), (event) => {
                if (mouseoutFunctionEvent)
                    mouseoutFunctionEvent(new BaseEvent(that));
            }, this);
            this.component.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseup, this.component.getElement(), (event) => {
                if (mouseupFunctionEvent)
                    mouseupFunctionEvent(new BaseEvent(that));
            }, this);
        } else {
            this.component.unRegisterEvent(EventFrameWork.event.MouseEvent.mouseover, BaseHTMLComponent.EventType.DOM);
            this.component.unRegisterEvent(EventFrameWork.event.MouseEvent.mouseout, BaseHTMLComponent.EventType.DOM);
            this.component.unRegisterEvent(EventFrameWork.event.MouseEvent.mouseup, BaseHTMLComponent.EventType.DOM);
        }
    }

    commandComponentDragEvent(start) {
        let that = this;
        if (this.component.getAttached()) {
            this.commandBindComponentDragEvent(start);
        } else {
            this.component.addListener(EventFrameWork.event.Components.BaseComponent.OnAfterLoad, () => {
                that.commandBindComponentDragEvent(start);
            }, that);
        }
    }

    commandComponentReset() {
        this.fireLeaveActive = false;
        this.mouseDownEvent = null;
        if (this.widgetUnderMouse) {
            let body = BodyElementWidget.get();
            body.removeItem(this.widgetUnderMouse);
            body.layoutExecute();

            this.widgetUnderMouse = null;
        }
    }

    highlighted(enable) {
        this.component.highlighted("Dashboard-highlighted", enable);
    }

    commandComponentDropEvent(start, mouseoverFunctionEvent, mouseoutFunctionEvent, mouseupFunctionEvent) {
        let that = this;
        if (this.component.getAttached()) {
            this.commandBindComponentDropEvent(start, mouseoverFunctionEvent, mouseoutFunctionEvent, mouseupFunctionEvent);
        } else {
            this.component.addListener(EventFrameWork.event.Components.BaseComponent.OnAfterLoad, () => {
                that.commandBindComponentDropEvent(start, mouseoverFunctionEvent, mouseoutFunctionEvent, mouseupFunctionEvent);
            }, that);
        }
    }

    getComponent() {
        return this.component;
    }

    addItemReadyToDrag(items) {
        this.items = items
    }

    getItemReadyToDrag() {
        return this.items;
    }

    addItemReadyToDrop(items) {
        this.items = items;

    }
}