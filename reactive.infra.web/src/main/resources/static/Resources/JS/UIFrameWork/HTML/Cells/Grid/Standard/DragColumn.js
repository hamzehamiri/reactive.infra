import {Drag} from "../../../DND/Drag.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {DragColumnEvent} from "./DragColumnEvent.js";

export class DragColumn extends Drag {
    constructor(component) {
        super(component);
    }

    onMouseMove(event) {
        if (this.mouseDown) {
            event.preventDefault();
            if (this.mouseDownPosition) {
                let mouse_new_x = event.clientX;
                let rec = this.component.getBoundingClientRect();

                let scrollLeftTable = this.component.getGrid().getElement().scrollLeft;
                let offsetScrollWidth = this.component.getGrid().offsetScrollWidth();
                offsetScrollWidth = this.component.getGrid().getLanguage().getIsRTL() ? -1 * offsetScrollWidth : offsetScrollWidth;

                this.component.setLeft(mouse_new_x + scrollLeftTable - (rec.width / 2) + offsetScrollWidth);
            }
        }
    }

    onMouseUp(event) {
        if (this.mouseDown) {
            let mouse_old_x = this.mouseDownPosition.clientX;
            let mouse_new_x = event.clientX;
            let dX = this.component.getLanguage().getIsRTL() ? mouse_old_x - mouse_new_x : mouse_new_x - mouse_old_x;

            this.component.fireEvent(EventFrameWork.event.MouseEvent.mouseup, new DragColumnEvent(event, dX, this.component));
        }
        super.onMouseUp(event);
    }
}