import {DOM} from "../../../../../Shared/Common/DOM.js";
import {HTMLComponent} from "../../../../Component/HTMLComponent.js";

export default class TableHtmlRender extends HTMLComponent {
    constructor(advancedGrid) {
        super();

        this.advancedGrid = advancedGrid;

        this.tbody = DOM.createElement('tbody');
        this.table = DOM.createElement('table');
        this.table.appendChild(this.tbody);

        this.setElement(this.table);

        this.generateTrFirst = false;
    }

    generateFirstTr() {
        if (!this.generateTrFirst) {
            this.totalWidthTable = this.advancedGrid.getTotalWidthColumns();
            this.table.setAttribute("style", "width : " + this.totalWidthTable.totalWidth + "px");
            this.tbody.appendChild(this.totalWidthTable.trGenerate);
            this.generateTrFirst = true;
        }
    }
}