import {BaseObservable} from "../../../../../Shared/Event/BaseObservable.js";

export default class WebGridAdvancedCellRender extends BaseObservable {
    constructor(webGridAdvanced) {
        super();
        this.setWebGridAdvanced(webGridAdvanced);
        this.fieldSerializerMap = new Map();
    }

    setWebGridAdvanced(webGridAdvanced) {
        this.webGridAdvanced = webGridAdvanced;
    }

    renderHtmlGridCell(colIndex, colConfig, record, tr, trModel) {
        return null;
    }
}