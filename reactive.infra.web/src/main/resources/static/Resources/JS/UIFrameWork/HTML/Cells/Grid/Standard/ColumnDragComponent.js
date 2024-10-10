import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {DragColumn} from "./DragColumn.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";

export class ColumnDragComponent extends HTMLComponent {
    constructor(tdList, colConfig, grid) {
        super();
        this.tdList = tdList;
        this.colConfig = colConfig;
        this.grid = grid;

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.DragComponent[0]));

        let dd = new DragColumn(this);
    }

    getTdList() {
        return this.tdList;
    }

    getColumnConfig() {
        return this.colConfig;
    }

    getGrid() {
        return this.grid;
    }
}