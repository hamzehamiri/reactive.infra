import BaseEvent from "../../../../Shared/Event/BaseEvent.js";

export default class TabTitleEvent extends BaseEvent{
    constructor(tabItemTitle) {
        super(tabItemTitle);
        this.setTabItemTitle(tabItemTitle);
    }

    setTabItemTitle(tabItemTitle) {
        this.tabItemTitle = tabItemTitle;
    }

    getTabItemTitle() {
        return this.tabItemTitle;
    }
}