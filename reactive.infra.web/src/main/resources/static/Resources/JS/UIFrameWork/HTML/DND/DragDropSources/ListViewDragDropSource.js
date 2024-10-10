import {DragDropSource} from "../DragDropSource.js";
import {HTMLComponent} from "../../Component/HTMLComponent.js";
import {DragDropEvent} from "../DragDropEvent.js";

export class ListViewDragDropSource extends DragDropSource {
    constructor(listView) {
        super(listView);
    }

    createEvent(event) {
        this.addItemReadyToDrag(this.component.getSelectedItems());
        return super.createEvent(new DragDropEvent(this));
    }

    generateUIEventUnderMouse(event) {
        if (this.items) {
            let component = new HTMLComponent();
            component.setHtml('<div>' + this.items.length + '</div>');
            return component;
        }
    }
}