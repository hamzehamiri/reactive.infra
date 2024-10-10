export class DragDropEvent {
    constructor(dragDropSource) {
        this.dragDropSource = dragDropSource;
    }

    getSource() {
        return this.dragDropSource;
    }
}