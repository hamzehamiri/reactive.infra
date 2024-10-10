import {HTMLComponent} from "../../../../Component/HTMLComponent.js";
import {RegisterComponent} from "../../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../ThemeLanguage/Theme.js";
import WebGridAdvancedDragColumn from "./WebGridAdvancedDragColumn.js";

export default class WebGridAdvancedColumnDragComponent extends HTMLComponent {
    constructor(tdList, colConfig, grid) {
        super();

        this.tdList = tdList;
        this.colConfig = colConfig;
        this.grid = grid;

        this.bindTheme();
        new WebGridAdvancedDragColumn(this);
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.DragComponent[0]));
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