import BaseEvent from "../../../../../Shared/Event/BaseEvent.js";

export default class WebGridAdvancedDragColumnEvent extends BaseEvent {
    constructor(event, dx, columnDragComponent) {
        super();
        this.event = event;
        this.dx = dx;
        this.columnDragComponent = columnDragComponent;
    }

    getDx() {
        return this.dx;
    }

    getColumnDragComponent() {
        return this.columnDragComponent;
    }
}