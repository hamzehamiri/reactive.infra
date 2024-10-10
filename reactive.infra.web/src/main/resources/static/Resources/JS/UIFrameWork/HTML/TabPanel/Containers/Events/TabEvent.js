import BaseEvent from "../../../../Shared/Event/BaseEvent.js";

export default class TabEvent extends BaseEvent {
    constructor(source) {
        super(source);
    }

    getTabPanel() {
        return this.getSource();
    }

    getGraphTabPanel() {
        return this.getSource();
    }

    getActiveItem() {
        return this.getTabPanel().getActiveItem();
    }

    getActiveGraphTabItem() {
        return this.getGraphTabPanel().getActiveGraphTabItem();
    }

    getPreviousActiveTabItem() {
        return this.getTabPanel().getTabPanelDataHandler().getPreviousActiveTabItem();
    }
}