import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {DragComponent} from "../DND/DragComponent.js";
import {ShareContainer} from "../../Shared/Layout/ShareContainer.js";
import {ResizeLayout} from "./ResizeLayout.js";
import {ResizeLayoutData} from "./ResizeLayoutData.js";
import {Drag} from "../DND/Drag.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import DragEvent from "../DND/DragEvent.js";
import {Util} from "../../Shared/Common/Util.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export class ResizeContainer extends HTMLContainer {

    constructor(component) {
        super();
        this.component = component;
        this.dragElementMatcherFunctionArray = [];

        this.setNoElement(true);
        this.setLayout(new ResizeLayout(component));
        this.makePositionable(true);
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.ResizeComponent[0]));
    }

    addDragElementMatcherFunction(dragElementMatcherFunction) {
        this.dragElementMatcherFunctionArray.push(dragElementMatcherFunction);
        if (this.getAttached() && this.dragger) {
            this.dragger.addDragElementMatcherFunction(dragElementMatcherFunction);
        }
    }

    syncActivate(resize, drag, dragMode) {
        if (resize) {
            this.leftDragger = new DragComponent(Drag.DragMode.Horizontal);
            this.leftDragger.addListener(EventFrameWork.event.position, this.onPositionDragComponent, this);
            this.rightDragger = new DragComponent(Drag.DragMode.Horizontal);
            this.rightDragger.addListener(EventFrameWork.event.position, this.onPositionDragComponent, this);
            this.topDragger = new DragComponent(Drag.DragMode.Vertical);
            this.topDragger.addListener(EventFrameWork.event.position, this.onPositionDragComponent, this);
            this.bottomDragger = new DragComponent(Drag.DragMode.Vertical);
            this.bottomDragger.addListener(EventFrameWork.event.position, this.onPositionDragComponent, this);

            this.addItem(this.leftDragger, new ResizeLayoutData(ResizeLayoutData.Type.Left));
            this.addItem(this.rightDragger, new ResizeLayoutData(ResizeLayoutData.Type.Right));
            this.addItem(this.topDragger, new ResizeLayoutData(ResizeLayoutData.Type.Top));
            this.addItem(this.bottomDragger, new ResizeLayoutData(ResizeLayoutData.Type.Bottom));

            this.component.addListener(EventFrameWork.event.position, this.onPositionResizeContainer, this);
            if (this.component.getAttached()) {
                this.borderComponent = Util.checkBorderWidth(this.component);
            } else {
                this.component.addListener(EventFrameWork.event.Components.BaseComponent.OnAfterLoad, (event) => {
                    this.borderComponent = Util.checkBorderWidth(this.component);
                }, this);
            }
        }
        if (drag) {
            this.dragger = new Drag(this.component, dragMode, null);
            for (let dragElementMatcherFunction of this.dragElementMatcherFunctionArray) {
                this.dragger.addDragElementMatcherFunction(dragElementMatcherFunction);
            }
        }
    }

    onPositionResizeContainer(eventBase) {
        this.layoutExecute();
    }

    onPositionDragComponent(eventBase) {
        if (eventBase instanceof DragEvent) {
            let leftBorder = this.borderComponent.all;
            let offsetLeft = this.component.getElement().offsetLeft;
            let offsetTop = this.component.getElement().offsetTop;
            let rec = this.component.getBoundingClientRect();
            let x = offsetLeft, y = offsetTop, width = rec.width - (leftBorder * 2), height = rec.height - (leftBorder * 2);
            let layoutData = eventBase.getSource().getData().get(ShareContainer.LayoutData);
            switch (layoutData.getType()) {
                case ResizeLayoutData.Type.Left :
                    x = offsetLeft + eventBase.getDxDy();
                    width = width - eventBase.getDxDy();
                    break;
                case ResizeLayoutData.Type.Right :
                    width = width + eventBase.getDxDy();
                    break;
                case ResizeLayoutData.Type.Top :
                    y = offsetTop + eventBase.getDxDy();
                    height = height - eventBase.getDxDy();
                    break;
                case ResizeLayoutData.Type.Bottom :
                    height = height + eventBase.getDxDy();
                    break;
            }
            this.component.setPosition(x, y);
            this.component.setSize(width, height);
        }
    }
}