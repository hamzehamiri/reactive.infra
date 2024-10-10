export class WebColumnConfig {
    constructor() {

    }

    setEditorModel(editorModel) {
        this.editorModel = editorModel;
    }

    getEditorModel() {
        return this.editorModel;
    }

    setFixWidth(fixWidth) {
        this.fixWidth = fixWidth;
    }

    setPercentWidth(percentWidth) {
        this.percentWidth = percentWidth;
    }

    setKeyForModelCell(keyModel) {
        this.keyModel = keyModel;
    }

    setDisplay(displayModel) {
        this.displayModel = displayModel;
    }

    getDisplay() {
        return this.displayModel;
    }

    getFixWidth() {
        return this.fixWidth;
    }

    getKeyForModelCell() {
        return this.keyModel;
    }

    setColumnIndex(columnIndex) {
        this.columnIndex = columnIndex;
    }

    getColumnIndex() {
        return this.columnIndex;
    }

    setSortColumnIndex(sortColumnIndex) {
        this.sortColumnIndex = sortColumnIndex;
    }

    getSortColumnIndex() {
        return this.sortColumnIndex;
    }

    setDescriptorCell(descriptor) {
        this.descriptor = descriptor;
    }

    getDescriptorCell() {
        return this.descriptor;
    }

    setRenderCellDescriptor(renderCellDescriptor) {
        this.renderCellDescriptor = renderCellDescriptor;
    }

    getRenderCellDescriptor() {
        return this.renderCellDescriptor;
    }

    static generateStyleTD(colConfig) {
        return 'width : ' + colConfig.getFixWidth() + 'px; max-width:' + colConfig.getFixWidth() + 'px;';
    }
}
