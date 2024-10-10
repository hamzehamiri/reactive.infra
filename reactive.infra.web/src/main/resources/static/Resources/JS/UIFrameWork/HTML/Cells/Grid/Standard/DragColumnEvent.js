export class DragColumnEvent {
    constructor(event, dx, columnDragComponent) {
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