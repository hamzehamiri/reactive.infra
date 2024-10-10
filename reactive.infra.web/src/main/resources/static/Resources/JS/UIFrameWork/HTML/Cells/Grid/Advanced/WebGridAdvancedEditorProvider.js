import {BaseObservable} from "../../../../Shared/Event/BaseObservable.js";

export default class WebGridAdvancedEditorProvider extends BaseObservable {
    constructor() {
        super();
        this.startEditorColumnarMap = new Map();
        this.isStartEditing = false;
    }

    startEditing(targetEl, row, col, record, webAdvancedGrid, webGridAdvancedEditorMode) {
        this.webAdvancedGrid = webAdvancedGrid;
    }

    resizing(col, width) {
        let columnArrayEditor = this.startEditorColumnarMap.get(col);
        columnArrayEditor.forEach(editor => {
            if (editor.getAttached()) {
                editor.setWidth(width);
            }
        });
    }

    stopEditing() {
        this.startEditorColumnarMap.forEach(columnArrayEditor => {
            columnArrayEditor.forEach(editor => {
                this.stopEditor(editor)
            });
        });
        this.startEditorColumnarMap.clear();
        this.isStartEditing = false;
    }

    stopEditor(editor) {
    }

    containOf(element) {
        let findEditor = [...this.startEditorColumnarMap.entries()].find(columnArrayEditor => {
            let find = columnArrayEditor[1].find(editor => editor.containOf(element));
            if (find)
                return true;
        });
        return findEditor != null;
    }
}