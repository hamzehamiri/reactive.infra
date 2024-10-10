import {Drag} from "../../../../DND/Drag.js";
import {EventFrameWork} from "../../../../../Shared/Event/EventFrameWork.js";
import WebGridAdvancedDragColumnEvent from "./WebGridAdvancedDragColumnEvent.js";

export default class WebGridAdvancedDragColumn extends Drag {

    constructor(dragSourceComponent) {
        super(dragSourceComponent);
    }

    onMouseMove(event) {
        if (this.mouseDown) {
            event.preventDefault();
            if (this.mouseDownPosition) {
                let mouse_new_x = event.clientX;
                let rec = this.dragSourceComponent.getBoundingClientRect();

                let scrollLeftTable = this.dragSourceComponent.getGrid().getElement().scrollLeft;
                // let offsetScrollWidth = this.dragSourceComponent.getGrid().offsetScrollWidth();
                // offsetScrollWidth = this.dragSourceComponent.getGrid().getLanguage().getIsRTL() ? -1 * offsetScrollWidth : offsetScrollWidth;
                let leftFinal = mouse_new_x - (this.dragSourceComponent.getElement().offsetParent.offsetLeft + (rec.width / 2)) + scrollLeftTable;
                // let leftFinal = mouse_new_x + scrollLeftTable - (rec.width / 2) + offsetScrollWidth;
                this.dragSourceComponent.setLeft(leftFinal);
            }
        }
    }

    onMouseUp(event) {
        if (this.mouseDown) {
            let mouse_old_x = this.mouseDownPosition.clientX;
            let mouse_new_x = event.clientX;
            let dX = this.dragSourceComponent.getLanguage().getIsRTL() ? mouse_old_x - mouse_new_x : mouse_new_x - mouse_old_x;

            this.dragSourceComponent.fireEvent(EventFrameWork.event.MouseEvent.mouseup, new WebGridAdvancedDragColumnEvent(event, dX, this.dragSourceComponent));
        }
        super.onMouseUp(event);
    }
}