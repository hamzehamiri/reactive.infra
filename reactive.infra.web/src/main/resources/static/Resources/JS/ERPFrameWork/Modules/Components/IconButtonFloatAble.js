import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {HTMLComponent} from "../../../UIFrameWork/HTML/Component/HTMLComponent.js";

export default class IconButtonFloatAble extends HTMLComponent {
    constructor(parentComponent, horizontal, iconButtonFloatAbleAlignment) {
        super();

        this.horizontal = horizontal;
        this.iconButtonFloatAbleAlignment = iconButtonFloatAbleAlignment;

        this.parentComponent = parentComponent;
        this.parentComponent.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseenter, this.parentComponent.getElement(), this.mouseEnterParent.name, this);
        this.parentComponent.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.mouseleave, this.parentComponent.getElement(), this.mouseLeaveParent.name, this);
        this.parentComponent.addListener(EventFrameWork.event.Components.BaseComponent.OnAfterLoad, () => {

        }, this);

        this.makePositionable(false);
        this.setElement(DOM.createElement('div'));
        this.toolbar = false;

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.btnClick.name, this);
    }

    btnClick(event) {

    }

    mouseEnterParent(event) {
        if (!this.toolbar) {
            this.setParent(this.parentComponent);
            this.onAttach(this.parentComponent.getElement(), (parentElement, childElement) => {
                parentElement.insertBefore(childElement, parentElement.firstChild);
            });
            this.toolbar = true;
        }
    }

    mouseLeaveParent(event) {

    }
}

export const IconButtonFloatAbleAlignment = {
    Center: 'Center',
    Bottom: 'Bottom',
    Top: 'Top'
}