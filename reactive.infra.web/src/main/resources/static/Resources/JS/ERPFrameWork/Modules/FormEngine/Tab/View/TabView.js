import BaseView from "../../../Common/BaseView.js";
import GridView from "./GridView.js";
import FormView from "./FormView.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class TabView extends BaseView {
    constructor() {
        super();
        this.uiElements.set(TabView.CoreButtonAssignElementDTOMap, new Map());
        this.gridView = new GridView();
        this.formView = new FormView();
        this.filterContainer = new HTMLContainer();
    }

    getCoreButtonAssignElementDTOMap() {
        return this.uiElements.get(TabView.CoreButtonAssignElementDTOMap);
    }

    getGridView() {
        return this.gridView;
    }

    getFormView() {
        return this.formView;
    }

    getFilterContainer() {
        return this.filterContainer;
    }
}

TabView.Editors = "Editors";
TabView.CoreButtonAssignElementDTOMap = "CoreButtonAssignElementDTOMap";
TabView.Controller = "Controller";